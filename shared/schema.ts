import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image_url: text("image_url").notNull(),
  video_url: text("video_url"),
  github_url: text("github_url"),
  published: integer("published", { mode: "boolean" }).default(true).notNull(),
  created_at: text("created_at").default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  updated_at: text("updated_at").default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
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
