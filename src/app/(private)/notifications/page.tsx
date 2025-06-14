'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useNotificationStore } from '@/contexts/notificationStore'
import {
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Settings,
  Trash2,
  Users,
  Award,
  Mail,
  MessageSquare,
} from 'lucide-react'
import { useState } from 'react'

export default function NotificationsPage() {
  const notifications = useNotificationStore((state) => state.notifications)
  const updateNotification = useNotificationStore((state) => state.updateNotification)
  const removeNotification = useNotificationStore((state) => state.removeNotification)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-5 h-5" />
      case 'participant':
        return <Users className="w-5 h-5" />
      case 'system':
        return <Settings className="w-5 h-5" />
      case 'achievement':
        return <Award className="w-5 h-5" />
      case 'reminder':
        return <Clock className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'from-red-500 to-red-600'

    switch (type) {
      case 'event':
        return 'from-blue-500 to-blue-600'
      case 'participant':
        return 'from-green-500 to-green-600'
      case 'system':
        return 'from-gray-500 to-gray-600'
      case 'achievement':
        return 'from-yellow-500 to-yellow-600'
      case 'reminder':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-blue-500 to-blue-600'
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'badge-blue'
      case 'participant':
        return 'badge-green'
      case 'system':
        return 'badge-gray'
      case 'achievement':
        return 'badge-yellow'
      case 'reminder':
        return 'badge-purple'
      default:
        return 'badge-blue'
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const passesReadFilter =
      filter === 'all' ||
      (filter === 'read' && notification.read) ||
      (filter === 'unread' && !notification.read)

    const passesTypeFilter = typeFilter === 'all' || notification.type === typeFilter

    return passesReadFilter && passesTypeFilter
  })

  const markAsRead = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    if (notification && !notification.read) {
      updateNotification({ ...notification, read: true })
    }
  }

  const markAllAsRead = () => {
    notifications.forEach((notif) => {
      if (!notif.read) {
        updateNotification({ ...notif, read: true })
      }
    })
  }

  const deleteNotification = (id: string) => {
    removeNotification(id)
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const todayCount = notifications.filter((n) => {
    const today = new Date()
    const notifDate = n.timestamp
    return notifDate.toDateString() === today.toDateString()
  }).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl text-white relative">
          <div className="relative z-10 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">Notificações</h1>
                    <p className="text-blue-100 text-lg">
                      Mantenha-se atualizado sobre seus eventos
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{unreadCount}</div>
                    <div className="text-sm text-blue-100">Não lidas</div>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{todayCount}</div>
                    <div className="text-sm text-blue-100">Hoje</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Todas ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              filter === 'unread'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Não lidas ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              filter === 'read'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Lidas ({notifications.length - unreadCount})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os tipos</option>
            <option value="event">Eventos</option>
            <option value="participant">Participantes</option>
            <option value="achievement">Conquistas</option>
            <option value="reminder">Lembretes</option>
            <option value="system">Sistema</option>
          </select>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Marcar todas como lidas
            </button>
          )}
        </div>
      </div>

      {/* Lista de Notificações */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="card-modern border-0 text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Nenhuma notificação encontrada
                </h3>
                <p className="text-gray-600">
                  Não há notificações que correspondam aos filtros selecionados.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`card-modern border-0 transition-all duration-300 hover:shadow-lg ${
                !notification.read ? 'ring-2 ring-blue-100' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-br ${getNotificationColor(
                        notification.type,
                        notification.priority
                      )} text-white`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3
                          className={`font-semibold ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        <Badge className={`badge-modern ${getBadgeColor(notification.type)}`}>
                          {notification.type === 'event'
                            ? 'Evento'
                            : notification.type === 'participant'
                            ? 'Participante'
                            : notification.type === 'achievement'
                            ? 'Conquista'
                            : notification.type === 'reminder'
                            ? 'Lembrete'
                            : 'Sistema'}
                        </Badge>
                        {notification.priority === 'high' && (
                          <Badge className="badge-modern badge-red">Urgente</Badge>
                        )}
                      </div>

                      <p className="text-gray-600 mb-3 leading-relaxed">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {notification.timestamp.toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>

                        {notification.action && (
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Marcar como lida"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Excluir notificação"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Configurações de Notificação */}
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-600" />
            Configurações de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Tipos de Notificação</h4>

              <div className="space-y-3">
                {[
                  { type: 'event', label: 'Eventos', icon: Calendar },
                  { type: 'participant', label: 'Participantes', icon: Users },
                  { type: 'achievement', label: 'Conquistas', icon: Award },
                  { type: 'reminder', label: 'Lembretes', icon: Clock },
                ].map(({ type, label, icon: Icon }) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-800">{label}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Métodos de Entrega</h4>

              <div className="space-y-3">
                {[
                  { method: 'web', label: 'Notificações Web', icon: Bell },
                  { method: 'email', label: 'Email', icon: Mail },
                  { method: 'sms', label: 'SMS', icon: MessageSquare },
                ].map(({ method, label, icon: Icon }) => (
                  <div
                    key={method}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-800">{label}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={method === 'web' || method === 'email'}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
