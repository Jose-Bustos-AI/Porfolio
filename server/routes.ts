import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from 'path';
import fs from 'fs';
import labsRouter from './routes/labs_router';
import uploadsRouter from './routes/uploads';
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

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
