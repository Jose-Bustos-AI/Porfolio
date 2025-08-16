import React, { useEffect, useState } from "react";

type PostInput = {
  title: string;
  image_url: string;
  video_url?: string;
  github_url?: string;
  content: string;
  published: boolean;
};

type ApiPost = {
  id: number;
  title: string;
  image_url: string;
  video_url?: string | null;
  github_url?: string | null;
  content: string;
  published: boolean;
  created_at: string;
};

const PortfolioAdmin: React.FC = () => {
  const [form, setForm] = useState<PostInput>({
    title: "",
    image_url: "",
    video_url: "",
    github_url: "",
    content: "",
    published: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  async function loadPosts() {
    setErrorMsg(null);
    try {
      const r = await fetch("/api/portfolio/posts");
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Error cargando posts");
      // El endpoint devuelve un array directamente
      setPosts(Array.isArray(j) ? j : []);
    } catch (e: any) {
      setErrorMsg(e.message || "No pudimos cargar los posts");
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setOkMsg(null);

    // Validación mínima antes del fetch
    if (!form.title.trim()) return setErrorMsg("El título es obligatorio");
    if (!form.image_url.trim()) return setErrorMsg("La URL de imagen es obligatoria");
    if (!/^https?:\/\//i.test(form.image_url)) return setErrorMsg("La URL de imagen debe empezar con http(s)://");
    if (!form.content.trim()) return setErrorMsg("El contenido es obligatorio");

    setSubmitting(true);
    try {
      const isEditing = editingId !== null;
      const url = isEditing ? `/api/portfolio/posts/${editingId}` : "/api/portfolio/posts";
      const r = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          content: form.content,
          image_url: form.image_url.trim(),
          video_url: form.video_url?.trim() || undefined,
          github_url: form.github_url?.trim() || undefined,
          published: !!form.published,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Error al guardar el post");

      setOkMsg(isEditing ? "Post actualizado correctamente" : "Post creado correctamente");
      setForm({
        title: "",
        image_url: "",
        video_url: "",
        github_url: "",
        content: "",
        published: true,
      });
      setEditingId(null);
      loadPosts();
    } catch (e: any) {
      setErrorMsg(e.message || "Error al guardar el post");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración — Portfolio</h1>

      {errorMsg && (
        <div className="mb-4 rounded-md bg-red-600/30 border border-red-500 px-4 py-3">
          <b>Error</b>: {errorMsg}
        </div>
      )}
      {okMsg && (
        <div className="mb-4 rounded-md bg-emerald-600/30 border border-emerald-500 px-4 py-3">
          {okMsg}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 bg-white/5 rounded-xl p-5">
        <div>
          <label className="block mb-1 text-sm">Título *</label>
          <input
            className="w-full rounded-md bg-black/30 border border-white/15 px-3 py-2 outline-none"
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Título del post"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">URL de Imagen (requerido)</label>
          <input
            className="w-full rounded-md bg-black/30 border border-white/15 px-3 py-2 outline-none"
            name="image_url"
            value={form.image_url}
            onChange={onChange}
            placeholder="https://ejemplo.com/imagen.png"
            required
            inputMode="url"
          />
          <p className="text-xs text-white/60 mt-1">Provee una URL http(s) válida. No se suben archivos.</p>
        </div>

        <div>
          <label className="block mb-1 text-sm">URL de Video (opcional)</label>
          <input
            className="w-full rounded-md bg-black/30 border border-white/15 px-3 py-2 outline-none"
            name="video_url"
            value={form.video_url}
            onChange={onChange}
            placeholder="https://www.youtube.com/embed/XXXX"
            inputMode="url"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">URL de GitHub (opcional)</label>
          <input
            className="w-full rounded-md bg-black/30 border border-white/15 px-3 py-2 outline-none"
            name="github_url"
            value={form.github_url}
            onChange={onChange}
            placeholder="https://github.com/usuario/repositorio"
            inputMode="url"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Contenido *</label>
          <textarea
            className="w-full min-h-[140px] rounded-md bg-black/30 border border-white/15 px-3 py-2 outline-none"
            name="content"
            value={form.content}
            onChange={onChange}
            placeholder="Contenido HTML del post…"
            required
          />
          <p className="text-xs text-white/60 mt-1">Puedes usar HTML básico.</p>
        </div>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={onChange}
          />
          Publicado
        </label>

        <div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2 transition disabled:opacity-50"
            >
              {submitting ? (editingId ? "Actualizando…" : "Guardando…") : (editingId ? "Actualizar post" : "Guardar post")}
            </button>
            {editingId !== null && (
              <button
                type="button"
                className="rounded-md bg-gray-600 hover:bg-gray-500 px-4 py-2 transition"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    image_url: "",
                    video_url: "",
                    github_url: "",
                    content: "",
                    published: true,
                  });
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <h2 className="text-xl font-semibold mt-10 mb-4">Posts</h2>
      <div className="grid gap-4">
        {posts.map((p) => (
          <div key={p.id} className="rounded-lg border border-white/10 p-4 bg-white/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-white/60">{new Date(p.created_at).toLocaleString()}</div>
                <div className="mt-2 text-xs break-all text-white/70">{p.image_url}</div>
              </div>
              <div className="shrink-0 flex gap-2">
                <button
                  type="button"
                  className="rounded-md bg-blue-600 hover:bg-blue-500 px-3 py-1 text-sm"
                  onClick={() => {
                    setEditingId(p.id);
                    setForm({
                      title: p.title,
                      image_url: p.image_url,
                      video_url: p.video_url || "",
                      github_url: p.github_url || "",
                      content: p.content,
                      published: p.published,
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && <div className="text-white/60">Sin posts todavía.</div>}
      </div>
    </div>
  );
};

export default PortfolioAdmin;
