import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../../config/site";

// ─────────────────────────────────────────────────────────────
// Genera /articulos/feed.xml automáticamente a partir de todos
// los artículos publicados (draft: false). No requiere ningún
// mantenimiento manual: cada nuevo archivo Markdown aparece solo
// en el feed la próxima vez que se compila el sitio.
// ─────────────────────────────────────────────────────────────
export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: siteConfig.siteName,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/articulos/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author ?? siteConfig.authorName,
    })),
    customData: `<language>${siteConfig.lang}</language>`,
  });
}
