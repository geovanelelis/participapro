'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <div className="w-full lg:ml-72 flex min-h-screen relative bg-gray-50">
        <Header setIsMobileOpen={setIsMobileOpen} />
        <main className="pt-20 pb-20 px-6 w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  )
}
