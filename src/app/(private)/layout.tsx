import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../app/globals.css'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'ParticipaPro',
  description: 'Sistema completo para monitoramento e gestão de participação em eventos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <div className='flex flex-col w-full min-h-screen bg-gray-50'>
              <Header />
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
