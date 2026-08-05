import { siteConfig } from "../config/site";

// ───────────────────────────────────────────────────────────────
// Construye la URL de WhatsApp a partir del número y mensaje
// configurados en src/config/site.ts. Úsalo en cualquier botón de
// WhatsApp del sitio para que todos apunten al mismo número.
// ───────────────────────────────────────────────────────────────
export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(
    message ?? siteConfig.whatsapp.defaultMessage
  );
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}

// ───────────────────────────────────────────────────────────────
// Devuelve la URL que debe abrir el botón "Agenda una consulta",
// según el proveedor configurado en site.ts (`booking.provider`).
// Así, cambiar de WhatsApp a Calendly / Google Calendar /
// GoHighLevel / Microsoft Bookings es cuestión de editar UN valor
// en site.ts — este helper y los componentes que lo usan no
// necesitan tocarse.
// ───────────────────────────────────────────────────────────────
export function getBookingUrl(): string {
  if (siteConfig.booking.provider === "whatsapp") {
    return getWhatsAppUrl(
      "Hola Dr. Diego Lucas, me gustaría agendar una consulta."
    );
  }
  return siteConfig.booking.url || getWhatsAppUrl();
}

// Formatea una fecha en español, ej: "12 de marzo de 2026".
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Formatea una fecha para <time datetime="...">.
export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// ───────────────────────────────────────────────────────────────
// Calcula el tiempo estimado de lectura a partir del contenido
// crudo en Markdown, a ~200 palabras por minuto. Se usa cuando el
// artículo no define `readingTime` manualmente en su frontmatter.
// ───────────────────────────────────────────────────────────────
export function estimateReadingTime(rawContent: string): number {
  const words = rawContent
    .replace(/```[\s\S]*?```/g, "") // ignora bloques de código
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Genera un slug simple a partir de un texto (usado para anclas
// de la tabla de contenido).
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
