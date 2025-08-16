import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image_url: text("image_url").notNull(),
  video_url: text("video_url"),         // opcional en BD
  github_url: text("github_url"),       // opcional en BD
  published: boolean("published").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

/** ----------- Zod schemas ----------- **/

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

const optionalUrl = z
  .string()
  .url({ message: "URL inválida" })
  .optional()
  // permitir cadena vacía desde el form -> null en BD
  .or(z.literal("").transform(() => undefined));

export const insertPostSchema = createInsertSchema(posts)
  .pick({
    title: true,
    content: true,
    image_url: true,
    video_url: true,
    github_url: true,
    published: true,
  })
  .extend({
    video_url: optionalUrl,
    github_url: optionalUrl,
    // published puede venir vacío -> default true en BD
    published: z.boolean().optional(),
  });

export const updatePostSchema = createInsertSchema(posts)
  .pick({
    title: true,
    content: true,
    image_url: true,
    video_url: true,
    github_url: true,
    published: true,
  })
  .partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPost = z.infer<typeof insertPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type Post = typeof posts.$inferSelect;
