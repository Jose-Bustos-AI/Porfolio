import { Router } from "express";
import { db } from "../db";
import * as schema from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

/**
 * Validación del body (solo URLs, sin archivos)
 * OJO: usamos snake_case para que coincida con el schema Drizzle.
 */
const postInput = z.object({
  title: z.string().min(1, "Titulo requerido"),
  content: z.string().min(1, "Contenido requerido"),
  image_url: z.string().url("URL de imagen inválida"),
  video_url: z
    .string()
    .url("URL de video inválida")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  github_url: z
    .string()
    .url("URL de GitHub inválida")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  published: z.boolean().optional().default(true),
});

const postUpdateInput = postInput.partial();

const router = Router();

/**
 * LISTAR POSTS
 * Para simplificar el Front, devolvemos directamente un ARRAY.
 */
router.get("/posts", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(schema.posts)
      .orderBy(desc(schema.posts.created_at));

    res.json(rows);
  } catch (e) {
    console.error("Error al obtener posts:", e);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
});

/**
 * OBTENER UN POST POR ID
 */
router.get("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const rows = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(rows[0]);
  } catch (e) {
    console.error("Error al obtener post por id:", e);
    res.status(500).json({ error: "Error al obtener el post" });
  }
});

/**
 * CREAR POST (solo JSON, sin multer)
 */
router.post("/posts", async (req, res) => {
  try {
    const parsed = postInput.parse(req.body);

    const [inserted] = await db
      .insert(schema.posts)
      .values({
        title: parsed.title,
        content: parsed.content,
        image_url: parsed.image_url,
        video_url: parsed.video_url,
        github_url: parsed.github_url,
        published: parsed.published ?? true,
      })
      .returning();

    res.json(inserted);
  } catch (e: any) {
    if (e?.issues) {
      return res.status(400).json({ error: "Datos inválidos", details: e.issues });
    }
    console.error("Error al crear post:", e);
    res.status(500).json({ error: "Error al crear el post" });
  }
});

/**
 * ACTUALIZAR POST
 */
router.put("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const parsed = postUpdateInput.parse(req.body);

    const [updated] = await db
      .update(schema.posts)
      .set({
        ...(parsed.title !== undefined ? { title: parsed.title } : {}),
        ...(parsed.content !== undefined ? { content: parsed.content } : {}),
        ...(parsed.image_url !== undefined ? { image_url: parsed.image_url } : {}),
        ...(parsed.video_url !== undefined ? { video_url: parsed.video_url } : {}),
        ...(parsed.github_url !== undefined ? { github_url: parsed.github_url } : {}),
        ...(parsed.published !== undefined ? { published: parsed.published } : {}),
        updated_at: new Date(),
      })
      .where(eq(schema.posts.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: "Post no encontrado" });
    res.json(updated);
  } catch (e: any) {
    if (e?.issues) {
      return res.status(400).json({ error: "Datos inválidos", details: e.issues });
    }
    console.error("Error al actualizar post:", e);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
});

/**
 * ELIMINAR POST
 */
router.delete("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await db.delete(schema.posts).where(eq(schema.posts.id, id));
    res.json({ success: true });
  } catch (e) {
    console.error("Error al eliminar post:", e);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
});

export default router;
