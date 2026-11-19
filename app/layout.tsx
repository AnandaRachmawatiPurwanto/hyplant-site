import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["600", "700", "800"] });

// On Vercel this is the production domain; locally it falls back to localhost.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HyPlant · Autodosing Hidroponik",
  description:
    "HyPlant membaca TDS, pH, suhu air, dan level tandon, lalu menambah Nutrisi A dan B sendiri. Pantau dan dapat notifikasi lewat aplikasi iOS.",
  icons: { icon: "/img/logo.png", apple: "/img/logo.png" },
  openGraph: {
    title: "HyPlant · Autodosing Hidroponik",
    description: "Nutrisi diatur otomatis, sesuai umur tanam.",
    images: ["/img/screens/monitor.png"],
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#002930", viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${interTight.variable}`}>{children}</body>
    </html>
  );
}
