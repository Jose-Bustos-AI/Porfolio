import { db } from '../db';
import { posts } from '@shared/schema';
import { InsertPost, Post, UpdatePost } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Funciones para manejar los posts del blog en la base de datos
 */
export const postsStorage = {
  /**
   * Obtener todos los posts ordenados por fecha de creación descendente
   */
  async getAllPosts(): Promise<Post[]> {
    return db.select().from(posts).orderBy(desc(posts.created_at));
  },

  /**
   * Obtener un post por su ID
   */
  async getPostById(id: number): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0];
  },

  /**
   * Crear un nuevo post
   */
  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  },

  /**
   * Actualizar un post existente
   */
  async updatePost(id: number, postData: UpdatePost): Promise<Post | undefined> {
    const [updatedPost] = await db
      .update(posts)
      .set({ 
        ...postData, 
        updated_at: new Date() 
      })
      .where(eq(posts.id, id))
      .returning();
    
    return updatedPost;
  },

  /**
   * Eliminar un post
   */
  async deletePost(id: number): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result.length > 0;
  },

  /**
   * Importar posts desde un JSON (para la migración inicial)
   */
  async importFromJson(postsData: any[]): Promise<Post[]> {
    const formattedPosts = postsData.map(post => ({
      title: post.title,
      content: post.content,
      image_url: post.image_url,
      video_url: post.video_url || null,
      published: true,
      created_at: new Date(post.created_at),
      updated_at: new Date()
    }));

    const importedPosts = await db.insert(posts).values(formattedPosts).returning();
    return importedPosts;
  }
};