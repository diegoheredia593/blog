// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// ─────────────────────────────────────────────────────────────
// Configuración de Astro para el sitio de Dr. Diego Lucas.
//
// - `site`: URL final del sitio. Cámbiala antes de publicar:
//   es necesaria para generar correctamente el sitemap, el RSS
//   y las URLs canónicas / Open Graph.
// - `integrations`: sitemap.xml automático (@astrojs/sitemap).
// - `vite.plugins`: Tailwind CSS v4 (sin archivo de config aparte,
//   los tokens de diseño viven en src/styles/global.css).
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: "https://www.drdiegolucas.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
});
