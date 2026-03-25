export default function handler(req: any, res: any) {
  res.json({
    ok: true,
    turso_url: !!process.env.TURSO_DATABASE_URL,
    turso_token: !!process.env.TURSO_AUTH_TOKEN,
    admin_pass: !!process.env.ADMIN_PASSWORD,
    node: process.version,
  });
}
