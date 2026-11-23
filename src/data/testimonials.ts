/* editorial-ui · Cristian Pérez · cristianperez.me */

export type Testimonial = {
  /** Lo que escribió el cliente, tal cual (WhatsApp, Instagram). Sin corregir el tono. */
  quote: string;
  /** Cómo firmar: nombre de pila y municipio, o lo que el cliente autorice. */
  who: string;
  /** Detalle opcional de la fiesta: "Cumpleaños de Sofi, 6 años". */
  party?: string;
  /** Solo se publica con true, después de que el cliente dio permiso. */
  approved: boolean;
};

/**
 * Mensajes reales de clientes. No inventar ninguno: pide 2 o 3 capturas a
 * Sammy, copia el texto y marca approved: true cuando el cliente acepte.
 * Mientras no haya ninguno aprobado, la sección no aparece en la página.
 */
export const TESTIMONIALS: Testimonial[] = [];
