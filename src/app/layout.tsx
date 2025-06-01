import type { Metadata } from "next"
import { Geist, Geist_Mono, Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  style: ["normal", "italic"],
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
})
export const metadata: Metadata = {
  title: "ComfyPlug",
  description: "The trusted gateway for access to cannabis and formerly black-market goods. We're redefining commerce by converting underground demand into safe, compliant, and modern marketplace experiences.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(poppins.variable, geistSans.variable, geistMono.variable,'antialiased')}>
        {children}
      </body>
    </html>
  )
}
