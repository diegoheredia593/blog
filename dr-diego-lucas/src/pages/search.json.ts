import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { toISODate } from "../lib/utils";

// ─────────────────────────────────────────────────────────────
// Genera /search.json en cada build con título, descripción,
// categoría, URL y fecha de cada artículo publicado. El
// componente Buscador.astro lo consume para dar resultados
// instantáneos sin backend ni servicio externo.
// Se regenera solo — nunca hay que tocarlo al publicar artículos.
// ─────────────────────────────────────────────────────────────
export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const items = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      url: `/articulos/${post.id}`,
      date: toISODate(post.data.date),
    }));

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
};
