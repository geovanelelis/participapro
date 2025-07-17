'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/contexts/authStore'
import { useEventStore } from '@/contexts/eventStore'
import { useFeedbackStore } from '@/contexts/feedbackStore'
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Clock,
  Eye,
  FileText,
  MessageSquare,
  Plus,
  Sparkles,
  Star,
  Target,
  CheckCircle,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function Dashboard() {
  const { user } = useAuth()
  const { events } = useEventStore()
  const { feedbacks } = useFeedbackStore()
  const isAdmin = user?.role === 'admin'
  const isParticipante = user?.role === 'participante'

  const upcomingEvents = events.filter((e) => e.status === 'upcoming')
  const ongoingEvents = events.filter((e) => e.status === 'ongoing')
  const completedEvents = events.filter((e) => e.status === 'completed')
  const averageSatisfaction =
    feedbacks.length > 0
      ? (feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length).toFixed(1)
      : '0.0'

  const statsCards = isAdmin
    ? [
        {
          title: 'Total de Eventos',
          value: events.length.toString(),
          icon: <Calendar size={24} />,
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600',
          trend: `${upcomingEvents.length} futuros`,
          description: `${completedEvents.length} concluídos`,
        },
        {
          title: 'Eventos em Andamento',
          value: ongoingEvents.length.toString(),
          icon: <Clock size={24} />,
          color: 'from-yellow-500 to-yellow-600',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-600',
          trend: ongoingEvents.length > 0 ? 'Ativo' : 'Nenhum',
          description: 'eventos ativos',
        },
        {
          title: 'Total de Feedbacks',
          value: feedbacks.length.toString(),
          icon: <MessageSquare size={24} />,
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-600',
          trend: `${feedbacks.filter((f) => f.status === 'pending').length} pendentes`,
          description: 'avaliações recebidas',
        },
        {
          title: 'Satisfação Média',
          value: averageSatisfaction,
          icon: <Star size={24} />,
          color: 'from-amber-500 to-amber-600',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-600',
          trend: parseFloat(averageSatisfaction) >= 4.0 ? 'Excelente' : 'Bom',
          description: 'de 5.0 estrelas',
        },
      ]
    : [
        {
          title: 'Meus Eventos',
          value: events.filter((e) => Math.random() > 0.5).length.toString(),
          icon: <Calendar size={24} />,
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600',
          trend: 'Participando',
          description: 'eventos inscritos',
        },
        {
          title: 'Eventos Concluídos',
          value: completedEvents.filter((e) => Math.random() > 0.3).length.toString(),
          icon: <CheckCircle size={24} />,
          color: 'from-green-500 to-green-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          trend: 'Finalizados',
          description: 'eventos participados',
        },
        {
          title: 'Feedbacks Dados',
          value: feedbacks.filter((f) => f.author === user?.name).length.toString(),
          icon: <MessageSquare size={24} />,
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-600',
          trend: 'Enviados',
          description: 'avaliações feitas',
        },
        {
          title: 'Próximo Evento',
          value: upcomingEvents.length > 0 ? '1' : '0',
          icon: <Clock size={24} />,
          color: 'from-orange-500 to-orange-600',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-600',
          trend: upcomingEvents.length > 0 ? 'Em breve' : 'Nenhum',
          description: 'evento próximo',
        },
      ]

  // Dados para gráficos (apenas para admin)
  const chartData = [
    { name: 'Jan', eventos: 4, participantes: 120, satisfacao: 4.2 },
    { name: 'Fev', eventos: 3, participantes: 98, satisfacao: 4.1 },
    { name: 'Mar', eventos: 5, participantes: 180, satisfacao: 4.5 },
    { name: 'Abr', eventos: 7, participantes: 250, satisfacao: 4.7 },
    { name: 'Mai', eventos: 5, participantes: 190, satisfacao: 4.3 },
    { name: 'Jun', eventos: 6, participantes: 220, satisfacao: 4.8 },
  ]

  const pieData = [
    { name: 'B2B', value: events.filter((e) => e.type === 'B2B').length, color: '#3B82F6' },
    { name: 'B2C', value: events.filter((e) => e.type === 'B2C').length, color: '#10B981' },
  ].filter((item) => item.value > 0)

  // Alertas baseados nos dados reais
  const alerts = []

  if (isAdmin) {
    if (ongoingEvents.length > 0) {
      alerts.push({
        type: 'warning',
        icon: <Clock size={16} />,
        title: 'Eventos em andamento',
        message: `${ongoingEvents.length} evento(s) precisam ser finalizados`,
        color: 'amber',
      })
    }

    if (feedbacks.filter((f) => f.status === 'pending').length > 0) {
      alerts.push({
        type: 'info',
        icon: <MessageSquare size={16} />,
        title: 'Feedbacks pendentes',
        message: `${
          feedbacks.filter((f) => f.status === 'pending').length
        } feedback(s) aguardando resposta`,
        color: 'blue',
      })
    }

    if (completedEvents.length > 0) {
      const eventsWithoutReports = completedEvents.length // Simular eventos sem relatório
      if (eventsWithoutReports > 0) {
        alerts.push({
          type: 'error',
          icon: <FileText size={16} />,
          title: 'Relatórios pendentes',
          message: `${eventsWithoutReports} evento(s) concluído(s) sem relatório`,
          color: 'red',
        })
      }
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Hero */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl text-white relative">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                    Olá, {user?.name || 'Usuário'}! 👋
                  </h1>
                  <p className="text-blue-100 text-lg">
                    {isAdmin
                      ? 'Bem-vindo ao seu painel de controle'
                      : 'Acompanhe seus eventos e atividades'}
                  </p>
                </div>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed max-w-lg">
                {isAdmin
                  ? 'Gerencie seus eventos, monitore participantes e acompanhe métricas em tempo real'
                  : 'Visualize seus eventos, dê feedback e acompanhe os resultados'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div className="hover:-translate-y-1 transition-all duration-300" key={index}>
            <Card className="card-modern card-hover border-0 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.textColor}`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-600">
                      <span className="text-sm font-semibold">{stat.trend}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Conteúdo específico para Admin */}
      {isAdmin && (
        <>
          {/* Seção de Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico principal */}
            <div className="lg:col-span-2">
              <Card className="card-modern border-0 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                        Evolução de Eventos e Participantes
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Acompanhe o crescimento dos últimos 6 meses
                      </p>
                    </div>
                    <Badge className="badge-modern badge-blue">Últimos 6 meses</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorEventos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorParticipantes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                        <YAxis stroke="#6B7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="eventos"
                          stroke="#3B82F6"
                          fillOpacity={1}
                          fill="url(#colorEventos)"
                          strokeWidth={3}
                          name="Eventos"
                        />
                        <Area
                          type="monotone"
                          dataKey="participantes"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#colorParticipantes)"
                          strokeWidth={3}
                          name="Participantes"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de pizza e alertas */}
            <div className="space-y-6">
              {/* Gráfico de distribuição */}
              {pieData.length > 0 && (
                <Card className="card-modern border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Tipos de Eventos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                      {pieData.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm text-gray-600">
                            {item.name} ({item.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Alertas */}
              <Card className="card-modern border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                    Alertas e Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.length > 0 ? (
                      alerts.map((alert, index) => (
                        <div
                          key={index}
                          className={`flex items-start p-4 bg-${alert.color}-50 rounded-xl border border-${alert.color}-100 hover:shadow-md hover:scale-102 transition-all duration-300`}
                        >
                          <div
                            className={`p-2 rounded-lg bg-${alert.color}-100 text-${alert.color}-600 mr-3`}
                          >
                            {alert.icon}
                          </div>
                          <div>
                            <h4 className={`text-sm font-semibold text-${alert.color}-800`}>
                              {alert.title}
                            </h4>
                            <p className={`text-xs text-${alert.color}-600`}>{alert.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="p-2 rounded-lg bg-green-100 text-green-600 mr-3">
                          <CheckCircle size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-green-800">Tudo em ordem!</h4>
                          <p className="text-xs text-green-600">
                            Não há alertas ou pendências no momento
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Tabela de Eventos */}
      <div>
        <Card className="card-modern border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                {isAdmin ? 'Eventos Recentes' : 'Meus Eventos'}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {isAdmin
                  ? 'Acompanhe o status dos seus eventos'
                  : 'Eventos que você está participando ou participou'}
              </p>
            </div>
            <Badge className="badge-modern badge-blue">
              Total: {isAdmin ? events.length : events.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">Tipo</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Local</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {events.slice(0, 5).map((event, index) => {
                    const startDate = new Date(event.startDate)
                    const formattedDate = startDate.toLocaleDateString('pt-BR')

                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm mr-3">
                              {event.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {event.name}
                              </div>
                              <div className="text-xs text-gray-500">ID: {event.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={`badge-modern ${
                              event.type === 'B2B' ? 'badge-blue' : 'badge-green'
                            }`}
                          >
                            {event.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formattedDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {event.location.split(',')[0]}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={`badge-modern ${
                              event.status === 'upcoming'
                                ? 'badge-blue'
                                : event.status === 'ongoing'
                                ? 'badge-yellow'
                                : 'badge-green'
                            }`}
                          >
                            {event.status === 'upcoming'
                              ? 'Futuro'
                              : event.status === 'ongoing'
                              ? 'Em andamento'
                              : 'Concluído'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
