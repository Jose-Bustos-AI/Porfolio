import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from 'path';
import fs from 'fs';

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Ruta para servir el archivo JSON de posts
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

  // Ruta para guardar posts (para el panel de administración)
  app.post('/api/posts', (req: Request, res: Response) => {
    try {
      const postsData = req.body;
      
      // Validación básica
      if (!Array.isArray(postsData)) {
        return res.status(400).json({ error: 'El formato de datos no es válido. Se espera un array de posts.' });
      }
      
      const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
      fs.writeFileSync(postsFilePath, JSON.stringify(postsData, null, 2), 'utf8');
      
      res.status(200).json({ success: true, message: 'Posts guardados correctamente' });
    } catch (error) {
      console.error('Error al guardar los posts:', error);
      res.status(500).json({ error: 'Error al guardar los posts' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
