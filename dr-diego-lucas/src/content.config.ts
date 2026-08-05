import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ═══════════════════════════════════════════════════════════════
// COLECCIÓN DE ARTÍCULOS (BLOG)
// ═══════════════════════════════════════════════════════════════
//
// Este archivo define QUÉ metadatos puede tener cada artículo en
// /src/content/posts/*.md — es la única "fuente de verdad" del
// esquema. Astro valida automáticamente cada archivo Markdown
// contra este esquema al compilar, y avisa si falta un campo
// obligatorio o si el tipo no coincide.
//
// NO necesitas registrar cada artículo en ningún otro lugar: basta
// con crear el archivo .md dentro de /src/content/posts/ y
// automáticamente aparecerá en portada, listado, categorías,
// búsqueda y artículos relacionados.
// ═══════════════════════════════════════════════════════════════

const posts = defineCollection({
  // `glob` recorre todos los .md dentro de src/content/posts/.
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      // Título del artículo. Obligatorio.
      title: z.string(),

      // Descripción corta (para tarjetas y meta description SEO).
      description: z.string(),

      // Fecha de publicación. Escríbela como 2026-03-12 en el .md.
      date: z.coerce.date(),

      // Categoría única del artículo (ej: "Tecnología"). El sistema
      // de categorías es automático: no hace falta declararlas en
      // ningún otro archivo, basta con escribir el nombre aquí.
      category: z.string(),

      // Etiquetas (puede haber varias). Opcional.
      tags: z.array(z.string()).default([]),

      // Imagen de portada. Opcional — si no se define, la tarjeta
      // y la cabecera del artículo simplemente no muestran imagen.
      cover: image().optional(),
      coverAlt: z.string().optional(),

      // Si es `true`, el artículo NO se publica (no aparece en
      // portada, listado, búsqueda ni RSS), útil para trabajar en
      // un borrador sin subirlo todavía.
      draft: z.boolean().default(false),

      // Autor. Por defecto usa el autor configurado en site.ts,
      // pero se puede sobreescribir por artículo (ej. invitados).
      author: z.string().optional(),

      // Tiempo de lectura en minutos. Si se omite, se calcula
      // automáticamente a partir del contenido (ver src/lib/utils.ts).
      readingTime: z.number().optional(),

      // Referencias bibliográficas opcionales, mostradas al final
      // del artículo.
      references: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().optional(),
          })
        )
        .optional(),
    }),
});

export const collections = { posts };
