import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './Dialog'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import {
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  FileText,
  AlertCircle,
} from 'lucide-react'

interface EventReport {
  eventId: string
  actualParticipants: number
  satisfactionScore: number
  keyTakeaways: string[]
  nextSteps: string[]
  additionalNotes: string
  reportDate: string
}

interface EventResultsModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: string
    name: string
    description: string
    expectedResults: string
    startDate: string
    endDate: string
    location: string
    type: string
    actualParticipants?: number
    satisfactionScore?: number
  }
  eventReport?: EventReport | null
}

const EventResultsModal: React.FC<EventResultsModalProps> = ({
  isOpen,
  onClose,
  event,
  eventReport,
}) => {
  if (!isOpen) return null

  // Dados mockados caso não haja relatório real
  const mockResults = {
    actualParticipants: Math.floor(Math.random() * 500) + 100,
    satisfactionScore: parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)),
    keyTakeaways: [
      'Alta participação e engajamento do público.',
      'Feedback positivo sobre a organização e conteúdo.',
      'Oportunidades de melhoria na logística de credenciamento.',
    ],
    nextSteps: [
      'Planejar evento similar com foco em novos mercados.',
      'Implementar sistema de credenciamento mais eficiente.',
    ],
    additionalNotes: 'Evento bem-sucedido com boa receptividade do público-alvo.',
  }

  // Usar dados do relatório real se disponível, senão usar mock
  const results = eventReport || mockResults
  const hasRealReport = !!eventReport

  const formattedStartDate = new Date(event.startDate).toLocaleDateString('pt-BR')
  const formattedEndDate = new Date(event.endDate).toLocaleDateString('pt-BR')

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Resultados do Evento: {event.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Visão geral dos resultados alcançados e próximos passos.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Informações do Evento */}
          <Card className="card-modern border-0 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Informações do Evento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {formattedStartDate} - {formattedEndDate}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Descrição:</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Resultados Esperados:</h4>
                <p className="text-sm text-gray-600">
                  {event.expectedResults || 'Nenhum resultado esperado definido.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Indicador de Fonte dos Dados */}
          {!hasRealReport && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                <strong>Dados simulados:</strong> Este evento ainda não possui um relatório oficial.
                Os dados mostrados são exemplificativos.
              </p>
            </div>
          )}

          {/* Resultados Chave */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Resultados Alcançados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Participantes Reais</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.actualParticipants || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Score de Satisfação</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {results.satisfactionScore || 'N/A'}
                      </p>
                      {results.satisfactionScore && (
                        <div className="flex items-center">
                          {renderStars(results.satisfactionScore)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Principais Aprendizados */}
          {results.keyTakeaways && results.keyTakeaways.length > 0 && (
            <Card className="card-modern border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Principais Aprendizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.keyTakeaways.map((item: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Próximos Passos */}
          {results.nextSteps && results.nextSteps.length > 0 && (
            <Card className="card-modern border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-blue-600" />
                  Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.nextSteps.map((item: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Observações Adicionais */}
          {results.additionalNotes && (
            <Card className="card-modern border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Observações Adicionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">{results.additionalNotes}</p>
              </CardContent>
            </Card>
          )}

          {/* Data do Relatório */}
          {hasRealReport && eventReport?.reportDate && (
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Relatório gerado em: {new Date(eventReport.reportDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}
        </div>

        {/* Botão de Fechar */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
          >
            Fechar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EventResultsModal
