import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Tabla para los posts del blog
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image_url: text("image_url").notNull(),
  video_url: text("video_url"),
  published: boolean("published").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Schema para crear/actualizar posts
export const insertPostSchema = createInsertSchema(posts).pick({
  title: true,
  content: true,
  image_url: true,
  video_url: true,
  published: true,
});

// Schema para actualizar posts
export const updatePostSchema = createInsertSchema(posts).pick({
  title: true,
  content: true,
  image_url: true,
  video_url: true,
  published: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPost = z.infer<typeof insertPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type Post = typeof posts.$inferSelect;
