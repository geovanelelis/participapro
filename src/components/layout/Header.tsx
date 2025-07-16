'use client'

import { useAuth } from '@/contexts/authStore'
import { usePathname, useRouter } from 'next/navigation'

export const Header = () => {
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
    <header className="fixed top-0 left-72 w-[calc(100%-theme(width.72))] px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-50 flex justify-between items-center ">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-gradient flex items-center">
          {pageTitles[pathname] ?? 'ParticipaPro'}
        </h1>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="px-2 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">
        Olá, {user?.name}!
      </div>
    </header>
  )
}
