import React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './Dialog'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  Target,
  Info,
  X,
  CheckCircle,
  AlertCircle,
  Play,
} from 'lucide-react'

interface Event {
  id: string
  name: string
  type: string
  startDate: string
  endDate: string
  location: string
  description: string
  expectedResults: string
  status: 'upcoming' | 'ongoing' | 'completed'
  active: boolean
  image: string
  category: string
  participants: string
}

interface EventDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
}
const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event }) => {
  const router = useRouter()
  if (!event) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusInfo = (status: 'upcoming' | 'ongoing' | 'completed') => {
    const statusMap = {
      upcoming: {
        text: 'Em Breve',
        color: 'text-blue-600 bg-blue-50',
        icon: <Clock className="w-4 h-4" />,
        description: 'Este evento ainda não começou',
      },
      ongoing: {
        text: 'Acontecendo Agora',
        color: 'text-green-600 bg-green-50',
        icon: <Play className="w-4 h-4" />,
        description: 'Este evento está em andamento',
      },
      completed: {
        text: 'Finalizado',
        color: 'text-gray-600 bg-gray-50',
        icon: <CheckCircle className="w-4 h-4" />,
        description: 'Este evento já foi concluído',
      },
    }

    return statusMap[status] || statusMap.upcoming
  }

  const statusInfo = getStatusInfo(event.status)

  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)
  const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                {event.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Informações completas sobre este evento
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Imagem e Status */}
          <div className="relative">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="absolute top-4 left-4 flex space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} flex items-center space-x-1`}
              >
                {statusInfo.icon}
                <span>{statusInfo.text}</span>
              </span>
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {event.category}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="text-sm font-medium text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                {event.type}
              </span>
            </div>
          </div>

          {/* Informações Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Descrição */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Sobre o Evento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Status:</strong> {statusInfo.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Resultados Esperados */}
              {event.expectedResults && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-green-600" />
                      Resultados Esperados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{event.expectedResults}</p>
                  </CardContent>
                </Card>
              )}

              {/* Avaliação */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Avaliação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-gray-300" />
                    </div>
                    <span className="text-lg font-semibold text-gray-800">4.2</span>
                    <span className="text-sm text-gray-500">(127 avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Baseado em avaliações de participantes de eventos anteriores
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Detalhes do Evento */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Detalhes do Evento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Data de Início</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(event.startDate)} às {formatTime(event.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Data de Término</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(event.endDate)} às {formatTime(event.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Duração</p>
                      <p className="text-sm text-gray-600">
                        {durationDays === 1 ? '1 dia' : `${durationDays} dias`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Local</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Participantes</p>
                      <p className="text-sm text-gray-600">{event.participants} esperados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
          {event.status === 'upcoming' && (
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
              onClick={() => router.push('/auth')}
            >
              Inscrever-se Agora
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EventDetailsModal
