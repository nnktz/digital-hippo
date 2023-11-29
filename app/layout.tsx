import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { cn, constructMetadata } from '@/lib/utils'

import { Navbar } from '@/components/layout/nav-bar'
import Providers from '@/components/providers'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn('relative h-full font-sans antialiased', inter.className)}
      >
        <main className="relative flex min-h-screen flex-col">
          <Providers>
            <Navbar />
            <div className="flex-1 flex-grow">{children}</div>
            <Footer />
          </Providers>
        </main>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
