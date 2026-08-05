// ═══════════════════════════════════════════════════════════════
// ARCHIVO DE CONFIGURACIÓN DEL SITIO
// ═══════════════════════════════════════════════════════════════
//
// Este es EL ÚNICO archivo que necesitas editar para cambiar los
// datos generales del sitio: nombre, autor, WhatsApp, redes
// sociales, correo, color principal, imágenes, etc.
//
// No necesitas tocar ningún componente ni página para actualizar
// esta información: todo el sitio lee estos valores desde aquí.
//
// ───────────────────────────────────────────────────────────────
// CÓMO CAMBIAR EL NÚMERO DE WHATSAPP
// Edita `whatsapp.number` más abajo. Usa el formato internacional
// sin espacios ni símbolos, por ejemplo: "593987654321"
// (código de país + número, sin el "+").
// ───────────────────────────────────────────────────────────────

export const siteConfig = {
  // Nombre que aparece en el header, footer y metadatos.
  siteName: "Dr. Diego Lucas",

  // Nombre del autor (para bylines, schema.org y SEO).
  authorName: "Dr. Diego Lucas",

  // Descripción corta del sitio, usada en SEO y en el feed RSS.
  description:
    "Reflexiones, investigación y conocimiento para comprender mejor el mundo.",

  // URL final del sitio (debe coincidir con `site` en astro.config.mjs).
  url: "https://www.drdiegolucas.com",

  // Idioma del sitio (usado en <html lang="">, RSS y schema.org).
  lang: "es",

  // ─────────────────────────────────────────────────────────────
  // WHATSAPP
  // El botón flotante y todos los enlaces "Agenda una consulta"
  // usan estos valores. Cambia solo aquí para actualizar el sitio
  // entero.
  // ─────────────────────────────────────────────────────────────
  whatsapp: {
    number: "593987654321", // <-- reemplaza por el número real
    // Mensaje que aparece pre-escrito al abrir WhatsApp.
    defaultMessage:
      "Hola Dr. Diego Lucas, me gustaría agendar una consulta.",
  },

  // ─────────────────────────────────────────────────────────────
  // AGENDA UNA CONSULTA
  // Hoy el botón principal de "Agenda una consulta" abre WhatsApp.
  // Para cambiarlo a Calendly, Google Calendar, GoHighLevel o
  // Microsoft Bookings en el futuro, SOLO necesitas modificar
  // `booking.provider` y `booking.url` aquí abajo. Ningún otro
  // archivo del sitio necesita cambios (ver src/components/CTAConsulta.astro
  // y src/components/BotonWhatsApp.astro, que leen estos valores).
  // ─────────────────────────────────────────────────────────────
  booking: {
    // "whatsapp" | "calendly" | "google-calendar" | "gohighlevel" | "microsoft-bookings"
    provider: "whatsapp" as const,
    // Si cambias el provider a otro distinto de "whatsapp", pon
    // aquí la URL de reserva (por ejemplo tu enlace de Calendly).
    url: "",
  },

  // Correo de contacto.
  email: "contacto@drdiegolucas.com",

  // Redes sociales. Deja el string vacío ("") para ocultar un ícono
  // del footer.
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  },

  // ─────────────────────────────────────────────────────────────
  // IMÁGENES
  // Coloca los archivos en /public/images/ y referencia la ruta
  // aquí. Ejemplo: si subes /public/images/autor/diego.jpg,
  // el valor debe ser "/images/autor/diego.jpg".
  // ─────────────────────────────────────────────────────────────
  images: {
    logo: "", // opcional: ruta a un logo en imagen. Vacío = usa el logo de texto.
    authorPhoto: "/images/autor/diego-lucas.jpg",
    ogDefault: "/images/og-default.jpg", // imagen social por defecto
  },

  // ─────────────────────────────────────────────────────────────
  // COLOR DE ACENTO
  // Este valor es solo de referencia — el color real vive como
  // variable CSS en src/styles/global.css (--color-accent), que es
  // donde Tailwind v4 lo lee. Cambia el valor en AMBOS lugares si
  // quieres un acento distinto.
  // ─────────────────────────────────────────────────────────────
  accentColor: "#1B2A4A", // azul oscuro editorial

  // Cantidad de artículos destacados en la portada (entre 3 y 6).
  featuredCount: 3,

  // Cantidad de artículos por página en el listado.
  postsPerPage: 9,
};

export type SiteConfig = typeof siteConfig;

// Menú principal del header. Para agregar o quitar una página del
// menú, edita este arreglo — no hace falta tocar el componente Header.
export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Artículos", href: "/articulos" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];

// Enlaces rápidos del footer.
export const footerLinks = [
  { label: "Inicio", href: "/" },
  { label: "Artículos", href: "/articulos" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];
