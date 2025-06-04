import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from 'path';
import fs from 'fs';
import labsRouter from './routes/labs_router';
import uploadsRouter from './routes/uploads';
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Headers de seguridad
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Solo agregar HSTS si estamos en producción con HTTPS
    if (process.env.NODE_ENV === 'production' && req.secure) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    
    next();
  });

  // Endpoints SEO como rutas de API para evitar conflictos con Vite
  app.get('/api/seo/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), 'dist', 'ssg', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      res.setHeader('Content-Type', 'application/xml');
      res.send(content);
    } else {
      res.status(404).send('Sitemap no encontrado');
    }
  });

  app.get('/api/seo/robots.txt', (req, res) => {
    const robotsPath = path.join(process.cwd(), 'dist', 'ssg', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      const content = fs.readFileSync(robotsPath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain');
      res.send(content);
    } else {
      res.status(404).send('Robots.txt no encontrado');
    }
  });

  // Middleware para servir páginas pre-renderizadas cuando sea apropiado
  app.use((req, res, next) => {
    // Solo para rutas principales y cuando el user-agent es un bot
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(req.get('User-Agent') || '');
    const mainRoutes = ['/', '/servicios', '/verticales', '/labs'];
    const isMainRoute = mainRoutes.includes(req.path);
    
    if (isBot && isMainRoute && req.method === 'GET') {
      const ssgPath = path.join(process.cwd(), 'dist', 'ssg');
      const filePath = req.path === '/' 
        ? path.join(ssgPath, 'index.html')
        : path.join(ssgPath, req.path, 'index.html');
        
      if (fs.existsSync(filePath)) {
        log(`Sirviendo página pre-renderizada para bot: ${req.path}`, 'ssg');
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(filePath);
        return;
      }
    }
    next();
  });

  // Configurar rutas de API
  app.use('/api/labs', labsRouter);
  app.use('/api/uploads', uploadsRouter);

  // Servir archivos estáticos desde la carpeta public
  app.use('/uploads', (req, res, next) => {
    const staticFilesPath = path.join(process.cwd(), 'public', 'uploads');
    return express.static(staticFilesPath)(req, res, next);
  });

  // Ruta para servir el archivo JSON de posts (compatibilidad con implementación anterior)
  app.get('/data/posts.json', (req: Request, res: Response) => {
    try {
      const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
      if (fs.existsSync(postsFilePath)) {
        const postsData = fs.readFileSync(postsFilePath, 'utf8');
        res.setHeader('Content-Type', 'application/json');
        res.send(postsData);
      } else {
        res.status(404).json({ error: 'Archivo de posts no encontrado' });
      }
    } catch (error) {
      console.error('Error al leer el archivo de posts:', error);
      res.status(500).json({ error: 'Error al cargar los posts' });
    }
  });

  // Ruta para inicializar la base de datos con datos de ejemplo
  app.post('/api/init-db', async (req: Request, res: Response) => {
    try {
      // Redirige a la ruta de importación de posts
      log('Redirigiendo a la ruta de importación de posts', 'init-db');
      
      // Hacemos una solicitud a nuestra propia API
      const importResponse = await fetch('http://localhost:5000/api/labs/posts/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      
      const importResult = await importResponse.json();
      
      if (!importResponse.ok) {
        throw new Error(`Error al importar posts: ${JSON.stringify(importResult)}`);
      }
      
      res.status(200).json({
        success: true,
        message: 'Base de datos inicializada correctamente',
        details: importResult
      });
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      res.status(500).json({ error: 'Error al inicializar la base de datos' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
