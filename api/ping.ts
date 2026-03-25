import { createClient } from '@libsql/client/http';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../shared/schema';

export default function handler(req: any, res: any) {
  try {
    const client = createClient({
      url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const db = drizzle(client, { schema });
    res.json({ ok: true, tables: Object.keys(schema) });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
