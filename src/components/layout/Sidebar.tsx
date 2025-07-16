'use client'

import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Calendar, MessageSquare, BarChart3, LogOut, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/authStore'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/events', icon: Calendar, label: 'Eventos' },
  { path: '/feedback', icon: MessageSquare, label: 'Feedback' },
  { path: '/reports', icon: BarChart3, label: 'Relatórios' },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleNav = (path: string) => router.push(path)

  const filteredNavItems = navItems.filter((item) => {
    if ((item.path === '/dashboard' || item.path === '/reports') && user?.role !== 'admin')
      return false
    return true
  })

  return (
    <aside className="fixed w-72 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 mb-10">
          <div className="bg-white/20 rounded-xl p-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-bold text-xl">ParticipaPro</h1>
        </div>

        <nav className="space-y-1">
          {filteredNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`flex items-center w-full p-3 rounded-lg transition-all duration-150 ${
                pathname === item.path ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="flex items-center bg-white/10 rounded-xl p-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center font-bold">
            {user?.name?.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-blue-200">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout()
            router.push('/')
          }}
          className="flex items-center w-full p-3 text-sm text-red-300 hover:bg-white/10 rounded-lg"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sair
        </button>
      </div>
    </aside>
  )
}
