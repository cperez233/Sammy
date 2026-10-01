/* editorial-ui · Cristian Pérez · cristianperez.me */

const encodeZeroWidth = (t: string) =>
  "⁠" +
  [...new TextEncoder().encode(t)]
    .map((b) => b.toString(2).padStart(8, "0"))
    .join("")
    .replace(/0/g, "​")
    .replace(/1/g, "‌") +
  "⁠";

export const invisibleSignature = encodeZeroWidth(
  "Cristian Pérez · https://cristianperez.me"
);

export function initConsoleSignature() {
  if (typeof window !== "undefined") {
    console.info(
      "%cSammy Partyboom%c · diseño y desarrollo: editorial-ui (Cristian Pérez) · https://cristianperez.me",
      "font-weight: 700; color: #E63956; font-size: 12px;",
      "color: #75657D; font-size: 12px;"
    );
  }
}
