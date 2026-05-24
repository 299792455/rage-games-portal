import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rage Games Portal",
  description: "Portal de juegos dificiles, rage games y retos die and retry para jugar gratis en el navegador.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="app-shell">{children}</body>
    </html>
  );
}
