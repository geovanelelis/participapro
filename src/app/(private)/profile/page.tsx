'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/contexts/authStore'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Shield,
  Camera,
  Edit3,
  Save,
  X,
  Bell,
  Lock,
  Globe,
  Palette,
  Activity,
  Award,
  Clock,
  Eye,
  Settings,
  UserCheck,
  Briefcase,
  Star,
  BarChart3,
  Users,
  ActivityIcon,
} from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    position: user?.position || '',
    department: user?.department || '',
    location: user?.location || '',
    bio: user?.bio || '',
  })

  const profileStats = [
    {
      title: 'Eventos Criados',
      value: '24',
      icon: <Calendar size={20} />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Participantes Gerenciados',
      value: '1,247',
      icon: <UserCheck size={20} />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Relatórios Gerados',
      value: '68',
      icon: <Activity size={20} />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Avaliação Média',
      value: '4.8',
      icon: <Star size={20} />,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
  ]

  const recentActivities = [
    {
      action: 'Criou evento',
      description: 'Festival Gastronômico 2025',
      time: '2 horas atrás',
      icon: <Calendar size={16} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      action: 'Gerou relatório',
      description: 'Relatório de Participação - Feira de Negócios',
      time: '1 dia atrás',
      icon: <Activity size={16} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      action: 'Atualizou contato',
      description: 'Empresa Tech Solutions',
      time: '3 dias atrás',
      icon: <Edit3 size={16} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      action: 'Recebeu avaliação',
      description: 'Nota 5 estrelas - Workshop de Inovação',
      time: '1 semana atrás',
      icon: <Star size={16} />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ]

  const preferences = [
    {
      title: 'Notificações por Email',
      description: 'Receber notificações de novos eventos e atividades',
      icon: <Mail size={18} />,
      enabled: true,
    },
    {
      title: 'Notificações Push',
      description: 'Alertas em tempo real no navegador',
      icon: <Bell size={18} />,
      enabled: true,
    },
    {
      title: 'Privacidade do Perfil',
      description: 'Tornar perfil visível para outros usuários',
      icon: <Eye size={18} />,
      enabled: true,
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header com foto e informações básicas */}
      <div className="relative overflow-hidden">
        <Card className="card-modern bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 border-0 text-white">
          <CardContent className="p-0">
            <div className="relative p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 lg:mb-0">
                  <div className="relative mb-4 sm:mb-0 sm:mr-6">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-3xl flex items-center justify-center text-4xl lg:text-5xl font-bold backdrop-blur-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300">
                      <Camera size={18} className="text-white" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h1 className="text-3xl lg:text-4xl font-bold mr-4">
                        {user?.name || 'Usuário'}
                      </h1>
                      <Badge className="bg-white/20 text-white border-white/20">
                        Administrador
                      </Badge>
                    </div>
                    <p className="text-blue-100 text-lg mb-2">
                      {user?.position || 'Gestor de Eventos'} • {user?.department || 'SECULT'}
                    </p>
                    <div className="flex items-center text-blue-200">
                      <MapPin size={16} className="mr-2" />
                      <span>{user?.location || 'Belo Horizonte, MG'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push('/settings')}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium"
                  >
                    <Edit3 size={18} />
                    <span>Editar Perfil</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas do perfil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {profileStats.map((stat, index) => (
          <Card key={index} className="card-modern card-hover border-0 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.textColor}`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Atividades recentes */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${activity.bgColor} ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Lock size={18} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Alterar Senha</span>
                  </div>
                  <Edit3 size={16} className="text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Globe size={18} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Sessões Ativas</span>
                  </div>
                  <Badge className="badge-modern badge-green">2 ativas</Badge>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          {/* Preferências */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                Preferências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preferences.map((pref, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-gray-600 mt-1">{pref.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{pref.title}</p>
                        <p className="text-xs text-gray-600">{pref.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pref.enabled}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <ActivityIcon className="w-5 h-5 mr-2 text-blue-600" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Criar Evento</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>Gerar Relatório</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl transition-colors">
                  <Users className="w-4 h-4" />
                  <span>Gerenciar Equipe</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
