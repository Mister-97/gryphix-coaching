import type { Metadata } from "next";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";

export const metadata: Metadata = {
  title: "Gryphix Coaching & Development | Strength For Your Next Step",
  description:
    "Transform your life through personalized virtual coaching. Connect with expert life coaching from anywhere. Book your free discovery call today.",
  openGraph: {
    title: "Gryphix Coaching Development | Strength For Your Next Step",
    description:
      "Transform your life through personalized virtual coaching. Unlock your potential, overcome obstacles, and create the life you've always envisioned.",
    images: ["https://images2.imgbox.com/d3/c7/uYMrDMEi_o.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gryphix Coaching & Development | Strength For Your Next Step",
    description:
      "Transform your life through personalized virtual coaching. Unlock your potential, overcome obstacles, and create the life you've always envisioned.",
    images: ["https://images2.imgbox.com/d3/c7/uYMrDMEi_o.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
