'use client'

import { useAuth } from '@/contexts/authStore'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'

interface HeaderProps {
  setIsMobileOpen: (open: boolean) => void
}

export const Header = ({ setIsMobileOpen }: HeaderProps) => {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/events': 'Eventos',
    '/feedback': 'Feedback',
    '/reports': 'Relatórios',
  }

  return (
    <header className="fixed top-0 left-0 lg:left-72 w-full lg:w-[calc(100%-theme(width.72))] px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-30 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        {/* Botão do menu mobile */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <h1 className="text-2xl font-bold text-gradient flex items-center">
          {pageTitles[pathname] ?? 'ParticipaPro'}
        </h1>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="px-2 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">
        <span className="hidden sm:inline">Olá, {user?.name}!</span>
        <span className="sm:hidden">{user?.name?.charAt(0)}</span>
      </div>
    </header>
  )
}
