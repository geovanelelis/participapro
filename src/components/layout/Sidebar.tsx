'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Link,
  Bell,
  User,
  HelpCircle,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/events', icon: Calendar, label: 'Eventos' },
  { path: '/contact', icon: Users, label: 'Contatos' },
  { path: '/feedback', icon: MessageSquare, label: 'Feedback' },
  { path: '/reports', icon: BarChart3, label: 'Relatórios' },
  { path: '/integrations', icon: Link, label: 'Integrações' },
  { path: '/notifications', icon: Bell, label: 'Notificações' },
  { path: '/profile', icon: User, label: 'Perfil' },
  { path: '/help', icon: HelpCircle, label: 'Ajuda' },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleNav = (path: string) => router.push(path)

  return (
    <aside className="w-72 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex items-center space-x-3 mb-10">
          <div className="bg-white/20 rounded-xl p-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl">ParticipaPro</h1>
            <span className="text-xs text-blue-200">v2.0</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
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
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name ?? 'Usuário'}</p>
            <p className="text-xs text-blue-200">{user?.position ?? 'Administrador'}</p>
          </div>
          <ChevronDown className="ml-auto w-4 h-4 text-blue-200" />
        </div>

        <div className="space-y-1">
          <button
            onClick={() => handleNav('/settings')}
            className="flex items-center w-full p-3 text-sm hover:bg-white/10 rounded-lg"
          >
            <Settings className="w-4 h-4 mr-3" />
            Configurações
          </button>
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
      </div>
    </aside>
  )
}
