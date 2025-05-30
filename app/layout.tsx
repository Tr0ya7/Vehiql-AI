import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"
import Header from "@/components/Header"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vehiql",
  description: "Find your dream car"
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">
          { children }
        </main>
        <Toaster richColors />
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>
              Made with 😘 by Luiz
            </p>
          </div>
        </footer>
      </body>
    </html>
  </ClerkProvider>
)

export default RootLayout