import { createClient } from '@libsql/client/http';
import { drizzle } from 'drizzle-orm/libsql';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Minimal schema without drizzle-zod
const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  published: integer("published", { mode: "boolean" }).default(true).notNull(),
  created_at: text("created_at").default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
});

export default async function handler(req: any, res: any) {
  try {
    const client = createClient({
      url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const db = drizzle(client, { schema: { posts } });
    const result = await db.select().from(posts).limit(1);
    res.json({ ok: true, rows: result.length });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
