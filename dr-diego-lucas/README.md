# Dr. Diego Lucas — Sitio web

Blog editorial minimalista construido con **Astro** + **Tailwind CSS v4**.
Prioridad de diseño: publicar un artículo nuevo debe ser tan simple como
crear un archivo Markdown — sin tocar código.

---

## 1. Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:4321
```

Comandos disponibles:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local con recarga automática |
| `npm run build` | Genera el sitio final en `/dist` (listo para subir a cualquier hosting estático) |
| `npm run preview` | Sirve `/dist` localmente para revisar el build de producción |

---

## 2. Cómo publicar un artículo nuevo

1. Crea un archivo `.md` dentro de `src/content/posts/`, por ejemplo:
   `src/content/posts/mi-nuevo-articulo.md`
2. Al inicio del archivo, agrega el bloque de metadatos:

```yaml
---
title: "Título del artículo"
description: "Resumen corto, se usa en tarjetas y SEO."
date: 2026-08-01
category: "Investigación"
tags: ["tag uno", "tag dos"]
cover: "./images/mi-imagen.jpg"   # opcional
coverAlt: "Descripción de la imagen"
draft: false
author: "Dr. Diego Lucas"          # opcional, usa el autor del sitio si se omite
readingTime: 6                     # opcional, se calcula solo si se omite
references:                        # opcional
  - label: "Nombre de la fuente"
    url: "https://ejemplo.com"
---
```

3. Debajo del bloque, escribe el contenido en Markdown normal
   (`## Subtítulo`, listas, negritas, enlaces, etc.).
4. Si tu artículo lleva imagen de portada, colócala junto al archivo
   `.md`, dentro de `src/content/posts/images/`, y referencia esa
   ruta relativa en `cover:` (ej. `./images/mi-imagen.jpg`).
5. Guarda. Eso es todo — el artículo aparece automáticamente en:
   - La página de inicio (si es uno de los más recientes)
   - `/articulos`
   - Su categoría en `/categorias/...`
   - El buscador
   - El feed RSS (`/articulos/feed.xml`)
   - Los artículos relacionados de otros posts de la misma categoría o etiquetas

No hace falta editar ningún otro archivo.

**Para trabajar en un borrador sin publicarlo todavía**, pon `draft: true`
— el artículo queda invisible en todo el sitio hasta que lo cambies a `false`.

---

## 3. Archivo de configuración único

`src/config/site.ts` centraliza todo lo que normalmente querrás cambiar:

- Nombre del sitio y del autor
- Número de WhatsApp y mensaje predefinido
- Proveedor de "Agenda una consulta" (`booking.provider`): hoy es
  `"whatsapp"`. El día que quieras usar Calendly, Google Calendar,
  GoHighLevel o Microsoft Bookings, cambia `booking.provider` y
  `booking.url` — ningún otro archivo necesita tocarse.
- Correo de contacto y redes sociales
- Rutas de imágenes (logo, foto del autor, imagen social por defecto)
- Menú principal (`mainNav`) y enlaces del footer (`footerLinks`)

---

## 4. Cómo cambiar colores y tipografía

Ambos viven en `src/styles/global.css`, dentro del bloque `@theme`:

```css
@theme {
  --color-accent: #1b2a4a;   /* el único color de acento del sitio */
  --font-display: "Cormorant Garamond", serif;  /* títulos */
  --font-body: "Inter", sans-serif;             /* texto */
}
```

Si cambias la tipografía por otra, recuerda importar sus archivos
`@fontsource` al inicio del mismo archivo (o un `<link>` a Google Fonts,
aunque se recomienda mantener las fuentes auto-hospedadas por rendimiento).

El modo oscuro usa variables separadas (`--color-*-dark`) definidas en el
mismo bloque.

---

## 5. Cómo cambiar imágenes

| Imagen | Dónde va | Cómo se referencia |
|---|---|---|
| Foto del autor | `public/images/autor/` | `siteConfig.images.authorPhoto` en `site.ts` |
| Imagen social (Open Graph) | `public/images/` | `siteConfig.images.ogDefault` en `site.ts` |
| Portada de un artículo | `src/content/posts/images/` | campo `cover:` en el frontmatter del `.md` |
| Logo (opcional, reemplaza el logo de texto) | `public/images/` | `siteConfig.images.logo` en `site.ts` |

---

## 6. Cómo cambiar el menú

Edita el arreglo `mainNav` en `src/config/site.ts`:

```ts
export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Artículos", href: "/articulos" },
  // agrega o quita líneas aquí
];
```

---

## 7. Cómo cambiar el número de WhatsApp

Un solo lugar: `siteConfig.whatsapp.number` en `src/config/site.ts`
(formato internacional sin `+`, ej. `"593987654321"`). Actualiza ese
valor y se propaga automáticamente al botón flotante, al header, al
CTA de "Agenda una consulta" y a la página de contacto.

---

## 8. Cómo agregar una página nueva

1. Crea `src/pages/mi-pagina.astro`.
2. Envuelve el contenido con el layout base:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Mi página" description="Descripción para SEO.">
  <p>Contenido...</p>
</BaseLayout>
```

3. Si quieres que aparezca en el menú, agrégala en `mainNav`
   (`src/config/site.ts`).

---

## 9. Estructura del proyecto

```
src/
  components/     Piezas reutilizables (Header, Footer, tarjetas, CTA, etc.)
  layouts/        BaseLayout.astro — estructura HTML compartida
  pages/          Cada archivo/carpeta = una ruta del sitio
  content/
    posts/        Artículos en Markdown (la fuente de verdad del blog)
      images/      Imágenes de portada de los artículos
  content.config.ts  Esquema de metadatos de los artículos
  config/site.ts  Configuración única del sitio
  lib/utils.ts    Funciones compartidas (fechas, WhatsApp, tiempo de lectura)
  styles/global.css  Tokens de diseño: colores, tipografía, modo oscuro
public/           Archivos estáticos servidos tal cual (favicon, robots.txt, imágenes generales)
```

---

## 10. SEO y rendimiento (ya incluido)

- Meta title / description, Open Graph, Twitter Cards y `canonical`
  automáticos en cada página (`src/components/SEO.astro`).
- Schema.org `BlogPosting` en cada artículo.
- `sitemap-index.xml` generado automáticamente (`@astrojs/sitemap`).
- `robots.txt` en `public/robots.txt`.
- Feed RSS automático en `/articulos/feed.xml`.
- Imágenes optimizadas automáticamente a WebP por Astro (`astro:assets`).
- Tipografías auto-hospedadas (sin llamadas a Google Fonts).
- Antes de publicar, actualiza `site` en `astro.config.mjs` y
  `siteConfig.url` en `src/config/site.ts` con el dominio final —
  son necesarios para que el sitemap, el RSS y las URLs canónicas
  apunten correctamente.

---

## 11. Preparado para escalar

La estructura ya deja espacio para agregar, sin rehacer nada:

- **Newsletter** → nuevo componente + formulario, o conectar un
  servicio (ej. Buttondown/Mailchimp) a `contacto.astro`.
- **Cursos / Podcast / Videos** → nuevas colecciones de contenido en
  `content.config.ts`, siguiendo el mismo patrón que `posts`.
- **Comentarios** → integrar un servicio embebido (ej. Giscus) dentro
  de `src/pages/articulos/[slug].astro`.
- **Panel administrativo / sistema de miembros** → Astro soporta
  agregar rutas de servidor (`output: "server"`) el día que se
  necesite backend real.
- **Agenda profesional distinta a WhatsApp** → ya resuelto, ver
  sección 3 (`booking.provider`).
- **Buscador más avanzado** → el índice ya existe en `/search.json`;
  se puede conectar a Pagefind o Algolia sin cambiar el resto del sitio.
