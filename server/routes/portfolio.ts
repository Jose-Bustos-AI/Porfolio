import { Router, Request, Response } from 'express';
import { postsStorage } from '../storage/portfolio';
import { insertPostSchema, updatePostSchema } from '@shared/schema';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import fs from 'fs';
import path from 'path';

// Crear router para las rutas de Labs
const labsRouter = Router();

// GET - Obtener todos los posts
labsRouter.get('/posts', async (req: Request, res: Response) => {
  try {
    const posts = await postsStorage.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// GET - Obtener un post por ID
labsRouter.get('/posts/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const post = await postsStorage.getPostById(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error al obtener post:', error);
    res.status(500).json({ error: 'Error al obtener el post' });
  }
});

// POST - Crear un nuevo post
labsRouter.post('/posts', async (req: Request, res: Response) => {
  try {
    // Validar datos con Zod
    const validatedData = insertPostSchema.parse(req.body);
    
    // Crear post en la base de datos
    const newPost = await postsStorage.createPost(validatedData);
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error al crear post:', error);
    
    if (error instanceof ZodError) {
      // Error de validación
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        details: fromZodError(error).message 
      });
    }
    
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

// PUT - Actualizar un post existente
labsRouter.put('/posts/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    // Validar datos con Zod
    const validatedData = updatePostSchema.parse(req.body);
    
    // Actualizar post en la base de datos
    const updatedPost = await postsStorage.updatePost(id, validatedData);
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error al actualizar post:', error);
    
    if (error instanceof ZodError) {
      // Error de validación
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        details: fromZodError(error).message 
      });
    }
    
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
});

// DELETE - Eliminar un post
labsRouter.delete('/posts/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const deleted = await postsStorage.deletePost(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.status(200).json({ success: true, message: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

// POST - Importar posts desde JSON
labsRouter.post('/posts/import', async (req: Request, res: Response) => {
  try {
    // Leer el archivo JSON de posts existente
    const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
    
    if (!fs.existsSync(postsFilePath)) {
      return res.status(404).json({ error: 'Archivo de posts no encontrado' });
    }
    
    const postsData = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
    
    if (!Array.isArray(postsData)) {
      return res.status(400).json({ error: 'Formato de archivo inválido' });
    }
    
    // Importar los posts a la base de datos
    const importedPosts = await postsStorage.importFromJson(postsData);
    
    res.status(200).json({ 
      success: true, 
      message: `${importedPosts.length} posts importados correctamente`,
      posts: importedPosts
    });
  } catch (error) {
    console.error('Error al importar posts:', error);
    res.status(500).json({ error: 'Error al importar los posts' });
  }
});

export default labsRouter;