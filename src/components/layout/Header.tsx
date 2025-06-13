'use client'

import { Bell, Search } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname, useRouter } from 'next/navigation'

export const Header = () => {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/events': 'Eventos',
    '/contact': 'Contatos',
    '/feedback': 'Feedback',
    '/reports': 'Relatórios',
    '/integrations': 'Integrações',
    '/notifications': 'Notificações',
    '/profile': 'Perfil',
    '/help': 'Ajuda',
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-gradient flex items-center">
          {pageTitles[pathname] ?? 'ParticipaPro'}
        </h1>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 shadow-sm">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-48"
          />
        </div>

        <div
          className="relative cursor-pointer p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
          onClick={() => router.push('/notifications')}
        >
          <Bell size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg font-semibold">
            9+
          </span>
        </div>

        <div
          className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
          onClick={() => router.push('/profile')}
        >
          {user?.name?.charAt(0) ?? 'U'}
        </div>
      </div>
    </header>
  )
}
