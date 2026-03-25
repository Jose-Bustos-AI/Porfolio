import { createClient } from '@libsql/client/http';

export default function handler(req: any, res: any) {
  try {
    const client = createClient({
      url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    res.json({ ok: true, client: 'created', url_set: !!process.env.TURSO_DATABASE_URL });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
