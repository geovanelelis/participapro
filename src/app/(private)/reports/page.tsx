'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useEventStore } from '@/contexts/eventStore'
import {
  FileText,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  Edit,
  Download,
  Plus,
  Eye,
  BarChart3,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/contexts/authStore'
import ReportModal from '@/components/ui/ReportModal'
import EventResultsModal from '@/components/ui/EventResultsModal'

interface EventReport {
  eventId: string
  actualParticipants: number
  satisfactionScore: number
  keyTakeaways: string[]
  nextSteps: string[]
  additionalNotes: string
  reportDate: string
}

export default function ReportsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const isParticipante = user?.role === 'participante'
  const { events } = useEventStore()

  const [eventReports, setEventReports] = useState<EventReport[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false)

  const completedEvents = events.filter((event) => event.status === 'completed')

  const userCompletedEvents = isParticipante
    ? completedEvents.filter((event) => {
        return ['event-1', 'event-2'].includes(event.id) || Math.random() > 0.5
      })
    : completedEvents

  const handleCreateReport = (event: any) => {
    setSelectedEvent(event)
    setIsReportModalOpen(true)
  }

  const handleEditReport = (event: any) => {
    setSelectedEvent(event)
    setIsReportModalOpen(true)
  }

  const handleViewResults = (event: any) => {
    setSelectedEvent(event)
    setIsResultsModalOpen(true)
  }

  const handleSaveReport = (report: EventReport) => {
    const existingIndex = eventReports.findIndex((r) => r.eventId === report.eventId)

    if (existingIndex >= 0) {
      const updatedReports = [...eventReports]
      updatedReports[existingIndex] = report
      setEventReports(updatedReports)
    } else {
      setEventReports([...eventReports, report])
    }

    alert('Relatório salvo com sucesso!')
  }

  const getEventReport = (eventId: string) => {
    return eventReports.find((report) => report.eventId === eventId)
  }

  const handleExportReport = (eventId: string) => {
    const report = getEventReport(eventId)
    const event = events.find((e) => e.id === eventId)

    if (!report || !event) {
      alert('Relatório não encontrado.')
      return
    }

    const reportData = {
      evento: event.name,
      data: `${new Date(event.startDate).toLocaleDateString('pt-BR')} - ${new Date(
        event.endDate
      ).toLocaleDateString('pt-BR')}`,
      local: event.location,
      participantesEsperados: 'N/A',
      participantesReais: report.actualParticipants,
      satisfacao: report.satisfactionScore,
      aprendizados: report.keyTakeaways,
      proximosPassos: report.nextSteps,
      observacoes: report.additionalNotes,
    }

    console.log('Dados do relatório para exportação:', reportData)
    alert('Relatório exportado! (Verifique o console para ver os dados)')
  }

  const handleExportAllReports = () => {
    if (eventReports.length === 0) {
      alert('Nenhum relatório disponível para exportação.')
      return
    }

    const allReportsData = eventReports.map((report) => {
      const event = events.find((e) => e.id === report.eventId)
      return {
        evento: event?.name || 'Evento não encontrado',
        data: event
          ? `${new Date(event.startDate).toLocaleDateString('pt-BR')} - ${new Date(
              event.endDate
            ).toLocaleDateString('pt-BR')}`
          : 'N/A',
        local: event?.location || 'N/A',
        participantesReais: report.actualParticipants,
        satisfacao: report.satisfactionScore,
        aprendizados: report.keyTakeaways,
        proximosPassos: report.nextSteps,
        observacoes: report.additionalNotes,
      }
    })

    console.log('Dados de todos os relatórios para exportação:', allReportsData)
    alert('Todos os relatórios exportados! (Verifique o console para ver os dados)')
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl text-white relative">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                      {isAdmin ? 'Relatórios de Eventos' : 'Resultados dos Eventos'}
                    </h1>
                    <p className="text-green-100 text-lg">
                      {isAdmin
                        ? 'Gere relatórios detalhados dos eventos concluídos'
                        : 'Visualize os resultados dos eventos que você participou'}
                    </p>
                  </div>
                </div>
                <p className="text-green-100 text-lg leading-relaxed max-w-lg">
                  {isAdmin
                    ? 'Documente resultados, aprendizados e próximos passos para cada evento finalizado.'
                    : 'Acompanhe o desempenho e os resultados dos eventos em que você participou.'}
                </p>
              </div>

              {isAdmin && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleExportAllReports}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium"
                  >
                    <Download className="w-5 h-5" />
                    <span>Exportar Todos</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-modern border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">
                  {userCompletedEvents.length}
                </span>
                <p className="text-sm text-gray-600">
                  {isAdmin ? 'Eventos Concluídos' : 'Eventos Participados'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-5"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-green-50 text-green-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">{eventReports.length}</span>
                <p className="text-sm text-gray-600">
                  {isAdmin ? 'Relatórios Gerados' : 'Resultados Disponíveis'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isAdmin && (
          <>
            <Card className="card-modern border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-yellow-50 text-yellow-600">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-gray-900">
                      {completedEvents.length - eventReports.length}
                    </span>
                    <p className="text-sm text-gray-600">Pendentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-gray-900">
                      {eventReports.length > 0
                        ? (
                            eventReports.reduce(
                              (acc, report) => acc + report.satisfactionScore,
                              0
                            ) / eventReports.length
                          ).toFixed(1)
                        : '0.0'}
                    </span>
                    <p className="text-sm text-gray-600">Satisfação Média</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isAdmin ? 'Eventos Concluídos' : 'Meus Eventos Concluídos'}
        </h2>

        {userCompletedEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {userCompletedEvents.map((event) => {
              const startDate = new Date(event.startDate)
              const endDate = new Date(event.endDate)
              const formattedStartDate = startDate.toLocaleDateString('pt-BR')
              const formattedEndDate = endDate.toLocaleDateString('pt-BR')
              const hasReport = getEventReport(event.id)

              return (
                <Card
                  key={event.id}
                  className="card-modern border-0 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
                            {event.name.charAt(0)}
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
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

                      {hasReport && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{hasReport.actualParticipants} participantes</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>

                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          Resultados esperados:
                        </p>
                        <p className="text-xs text-gray-600">{event.expectedResults}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        {isAdmin ? (
                          // Botões para Admin
                          !hasReport ? (
                            <button
                              onClick={() => handleCreateReport(event)}
                              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Criar Relatório</span>
                            </button>
                          ) : (
                            <div className="flex space-x-2 w-full">
                              <button
                                onClick={() => handleEditReport(event)}
                                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Editar</span>
                              </button>
                              <button
                                onClick={() => handleExportReport(event.id)}
                                className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-1"
                              >
                                <Download className="w-4 h-4" />
                                <span>Exportar</span>
                              </button>
                            </div>
                          )
                        ) : (
                          // Botões para Participante
                          <button
                            onClick={() => handleViewResults(event)}
                            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Ver Resultados</span>
                          </button>
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
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {isAdmin
                  ? 'Nenhum evento concluído encontrado'
                  : 'Nenhum evento concluído disponível'}
              </h3>
              <p className="text-gray-500">
                {isAdmin
                  ? 'Eventos concluídos aparecerão aqui para geração de relatórios.'
                  : 'Eventos concluídos que você participou aparecerão aqui.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false)
          setSelectedEvent(null)
        }}
        onSave={handleSaveReport}
        event={selectedEvent}
        existingReport={selectedEvent ? getEventReport(selectedEvent.id) : null}
      />

      <EventResultsModal
        isOpen={isResultsModalOpen}
        onClose={() => {
          setIsResultsModalOpen(false)
          setSelectedEvent(null)
        }}
        event={selectedEvent || { id: '', name: '', expectedResults: '' }}
      />
    </div>
  )
}
