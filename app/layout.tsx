import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"

import "./globals.css"
import { ourFileRouter } from "./api/uploadthing/core"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "DoIt!",
  description: "DoIt! is platform for event management",
  icons: {
    icon: "/assets/images/logo.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
