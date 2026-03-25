import { db } from '../server/db';

export default async function handler(req: any, res: any) {
  try {
    // Try a simple DB query
    const result = await db.query.posts.findMany({ limit: 1 });
    res.json({ ok: true, db: 'connected', rows: result.length });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message, stack: e.stack?.slice(0, 300) });
  }
}
