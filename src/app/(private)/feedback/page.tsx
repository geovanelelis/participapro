'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useFeedbackStore } from '@/contexts/feedbackStore'
import {
  MessageSquare,
  Star,
  AlertTriangle,
  Calendar,
  Filter,
  Search,
  Download,
  Reply,
  CheckCircle,
  XCircle,
  MapPin,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/contexts/authStore'
import { useEventStore } from '@/contexts/eventStore'
import FeedbackModal from '@/components/ui/FeedbackModal'

export default function FeedbackPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const isParticipante = user?.role === 'participante'

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [selectedEventForFeedback, setSelectedEventForFeedback] = useState<any>(null)

  const { feedbacks, addFeedback } = useFeedbackStore()
  const { events } = useEventStore()

  const mockCompletedEvents = isParticipante
    ? [
        {
          id: 'event-1',
          name: 'Conferência de Inovação 2024',
          description: 'Um evento focado nas últimas tendências de inovação e tecnologia.',
          status: 'completed',
          type: 'B2B',
          startDate: '2024-05-10T09:00:00',
          endDate: '2024-05-10T17:00:00',
          location: 'Centro de Convenções São Paulo',
          expectedResults: 'Gerar 50 leads qualificados e fechar 5 negócios.',
        },
        {
          id: 'event-2',
          name: 'Feira de Tecnologia 2024',
          description: 'Exposição das mais recentes inovações tecnológicas do mercado.',
          status: 'completed',
          type: 'B2C',
          startDate: '2024-04-15T08:00:00',
          endDate: '2024-04-17T18:00:00',
          location: 'Expo Center Norte',
          expectedResults: 'Apresentar novos produtos e aumentar reconhecimento da marca.',
        },
        {
          id: 'event-3',
          name: 'Workshop de Marketing Digital',
          description: 'Capacitação em estratégias avançadas de marketing digital.',
          status: 'completed',
          type: 'B2B',
          startDate: '2024-03-20T14:00:00',
          endDate: '2024-03-20T18:00:00',
          location: 'Hotel Intercontinental',
          expectedResults: 'Capacitar equipe e implementar 3 novas estratégias de marketing.',
        },
      ]
    : []

  const statsCards = [
    {
      title: 'Total de Feedbacks',
      value: feedbacks.length.toString(),
      icon: <MessageSquare size={24} />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Avaliação Média',
      value: '4.2',
      icon: <Star size={24} />,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Pendentes',
      value: '12',
      icon: <AlertTriangle size={24} />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ]

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const eventName = events.find((e) => e.id === feedback.event)?.name || ''

    const matchesSearch =
      feedback.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'pending' && feedback.status === 'pending') ||
      (selectedFilter === 'positive' && feedback.resultsAchieved === true) ||
      (selectedFilter === 'negative' && feedback.resultsAchieved === false)

    if (isParticipante) {
      return matchesSearch && matchesFilter && feedback.author === user?.name
    }

    return matchesSearch && matchesFilter
  })

  const handleOpenFeedbackModal = (event: any) => {
    setSelectedEventForFeedback(event)
    setIsFeedbackModalOpen(true)
  }

  const handleSubmitFeedback = (
    eventId: string,
    feedbackData: { rating: number; comment: string; resultsAchieved: boolean }
  ) => {
    const event = mockCompletedEvents.find((e) => e.id === eventId)
    if (!event) return

    addFeedback({
      id: Date.now(),
      author: user?.name || 'Participante',
      event: event.name,
      comment: feedbackData.comment,
      rating: feedbackData.rating,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'pending',
      resultsAchieved: feedbackData.resultsAchieved,
      eventExpectedResults: event.expectedResults,
    })

    alert('Feedback enviado com sucesso!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'badge-yellow'
      case 'reviewed':
        return 'badge-blue'
      case 'responded':
        return 'badge-green'
      default:
        return 'badge-gray'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'reviewed':
        return 'Analisado'
      case 'responded':
        return 'Respondido'
      default:
        return 'Novo'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const hasUserGivenFeedback = (eventName: string) => {
    return feedbacks.some((fb) => fb.event === eventName && fb.author === user?.name)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 rounded-2xl text-white relative">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                {user?.role === 'admin' ? (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-2">Análise de Feedback</h1>
                        <p className="text-yellow-100 text-lg">
                          Monitore satisfação e melhore experiências
                        </p>
                      </div>
                    </div>
                    <p className="text-yellow-100 text-lg leading-relaxed max-w-lg">
                      Colete, analise e responda feedbacks para aprimorar seus eventos
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold mb-2">Meus Feedbacks</h1>
                      <p className="text-yellow-100 text-lg">
                        Avalie suas experiências em eventos participados
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {isAdmin && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium">
                    <Download className="w-5 h-5" />
                    <span>Exportar Relatório</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas para Admin */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="card-modern card-hover border-0 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
              <CardContent className="p-6 flex gap-6 items-center relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.textColor}`}>
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isParticipante && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Eventos Concluídos - Avalie sua Experiência
          </h2>
          {mockCompletedEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCompletedEvents.map((event) => {
                const startDate = new Date(event.startDate)
                const endDate = new Date(event.endDate)
                const formattedStartDate = startDate.toLocaleDateString('pt-BR')
                const formattedEndDate = endDate.toLocaleDateString('pt-BR')
                const hasFeedback = hasUserGivenFeedback(event.name)

                return (
                  <Card
                    key={event.id}
                    className="card-modern border-0 hover:shadow-lg transition-all duration-300 group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
                              {event.name.charAt(0)}
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-yellow-600 transition-colors">
                              {event.name}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`badge-modern ${
                              event.type === 'B2B' ? 'badge-blue' : 'badge-green'
                            }`}
                          >
                            {event.type}
                          </Badge>
                          <Badge className="badge-modern badge-green">Concluído</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {formattedStartDate} - {formattedEndDate}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {event.description}
                        </p>

                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-xs font-semibold text-gray-700 mb-1">
                            Resultados esperados:
                          </p>
                          <p className="text-xs text-gray-600">{event.expectedResults}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          {!hasFeedback ? (
                            <button
                              onClick={() => handleOpenFeedbackModal(event)}
                              className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>Avaliar Evento</span>
                            </button>
                          ) : (
                            <div className="w-full text-center">
                              <Badge className="flex items-center justify-center space-x-2">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                <p>Feedback Enviado</p>
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="card-modern border-0">
              <CardContent className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Nenhum evento concluído para dar feedback
                </h3>
                <p className="text-gray-500">
                  Participe de eventos para poder compartilhar sua experiência!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Filtros e Busca (para Admin) */}
      {isAdmin && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="positive">Positivos</option>
              <option value="negative">Negativos</option>
            </select>
          </div>

          <div className="flex items-center bg-white rounded-xl px-3 py-2 border border-gray-300 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar feedback..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Lista de Feedbacks (para Admin) */}
      {isAdmin && (
        <div className="grid gap-4">
          {filteredFeedbacks.map((fb) => {
            const eventName = events.find((e) => e.id === fb.event)?.name
            return (
              <div
                key={fb.id}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 text-yellow-700 font-bold rounded-full flex items-center justify-center">
                      {fb.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{fb.author}</p>
                      <p className="text-xs text-gray-500">{fb.date}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(fb.status)}>{getStatusLabel(fb.status)}</Badge>
                </div>

                <div className="flex items-center text-sm text-gray-600 space-x-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{eventName}</span>
                </div>

                <div className="flex items-center mt-2 mb-2">{renderStars(fb.rating)}</div>

                <p className="text-gray-700 text-sm italic mb-3">"{fb.comment}"</p>

                {fb.resultsAchieved !== undefined && (
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="font-semibold mr-2">Resultados Esperados Atingidos:</span>
                    {fb.resultsAchieved ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" /> Sim
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <XCircle className="w-4 h-4 mr-1" /> Não
                      </span>
                    )}
                  </div>
                )}
                {fb.eventExpectedResults && (
                  <p className="text-sm text-gray-600 mb-3">
                    Previsão: <span className="font-medium">{fb.eventExpectedResults}</span>
                  </p>
                )}

                <div className="flex items-center justify-end">
                  {isAdmin && (
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <button className="ml-4 flex items-center text-blue-600 hover:underline">
                        <Reply className="w-4 h-4" />
                        Responder
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal de Feedback */}
      {selectedEventForFeedback && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => {
            setIsFeedbackModalOpen(false)
            setSelectedEventForFeedback(null)
          }}
          onSubmitFeedback={handleSubmitFeedback}
          event={selectedEventForFeedback}
        />
      )}
    </div>
  )
}
