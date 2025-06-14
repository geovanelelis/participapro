'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useEventStore } from '@/contexts/eventStore'
import {
  Calendar,
  Clock,
  Eye,
  MapPin,
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  AlertCircle,
  PlayCircle,
} from 'lucide-react'
import { useState } from 'react'

interface NewEventData {
  name: string
  type: 'B2B' | 'B2C'
  startDate: string
  endDate: string
  location: string
  description: string
  expectedResults: string
}

export default function EventosPage() {
  const { events, addEvent, removeEvent } = useEventStore()
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>(
    'all'
  )
  const [typeFilter, setTypeFilter] = useState<'all' | 'B2B' | 'B2C'>('all')

  const [newEvent, setNewEvent] = useState<NewEventData>({
    name: '',
    type: 'B2B',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    expectedResults: '',
  })

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesType = typeFilter === 'all' || event.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateEvent = () => {
    if (!newEvent.name || !newEvent.startDate || !newEvent.endDate || !newEvent.location) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const event = {
      id: Date.now().toString(),
      ...newEvent,
      status: 'upcoming' as const,
    }

    addEvent(event)
    setNewEvent({
      name: '',
      type: 'B2B',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      expectedResults: '',
    })
    setActiveTab('list')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4" />
      case 'ongoing':
        return <PlayCircle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Futuro'
      case 'ongoing':
        return 'Em andamento'
      case 'completed':
        return 'Concluído'
      default:
        return 'Indefinido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'badge-blue'
      case 'ongoing':
        return 'badge-yellow'
      case 'completed':
        return 'badge-green'
      default:
        return 'badge-gray'
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Hero */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl text-white relative">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">Gestão de Eventos</h1>
                    <p className="text-purple-100 text-lg">
                      Monitore e gerencie todos os seus eventos
                    </p>
                  </div>
                </div>
                <p className="text-purple-100 text-lg leading-relaxed max-w-lg">
                  Crie, edite e acompanhe seus eventos em tempo real. Mantenha tudo sob controle com
                  facilidade.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveTab('create')}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 text-white font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Novo Evento</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 text-white font-medium">
                  <Download className="w-5 h-5" />
                  <span>Relatório</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-modern border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">{events.length}</span>
                <p className="text-sm text-gray-600">Total de Eventos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-5"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-green-50 text-green-600">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">
                  {events.filter((e) => e.status === 'ongoing').length}
                </span>
                <p className="text-sm text-gray-600">Em Andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 opacity-5"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">
                  {events.filter((e) => e.status === 'upcoming').length}
                </span>
                <p className="text-sm text-gray-600">Futuros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-modern border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-5"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">
                  {events.filter((e) => e.status === 'completed').length}
                </span>
                <p className="text-sm text-gray-600">Concluídos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'list'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Lista de Eventos
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'create'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Cadastrar Evento
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'list' ? (
        <div className="space-y-6">
          {/* Filtros e Busca */}
          <Card className="card-modern border-0">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Todos os Status</option>
                    <option value="upcoming">Futuros</option>
                    <option value="ongoing">Em Andamento</option>
                    <option value="completed">Concluídos</option>
                  </select>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Todos os Tipos</option>
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Eventos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const startDate = new Date(event.startDate)
              const endDate = new Date(event.endDate)
              const formattedStartDate = startDate.toLocaleDateString('pt-BR')
              const formattedEndDate = endDate.toLocaleDateString('pt-BR')

              return (
                <Card
                  key={event.id}
                  className="card-modern border-0 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
                            {event.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                              {event.name}
                            </h3>
                            <p className="text-sm text-gray-500">ID: {event.id}</p>
                          </div>
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

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getStatusIcon(event.status)}
                          <Badge className={`badge-modern ${getStatusColor(event.status)} ml-2`}>
                            {getStatusText(event.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeEvent(event.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredEvents.length === 0 && (
            <Card className="card-modern border-0">
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Nenhum evento encontrado
                </h3>
                <p className="text-gray-500">Tente ajustar os filtros ou criar um novo evento.</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* Formulário de Cadastro */
        <Card className="card-modern border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-purple-600" />
              Cadastrar Novo Evento
            </CardTitle>
            <p className="text-sm text-gray-600">Preencha as informações do evento</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome do Evento *
                </label>
                <input
                  type="text"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite o nome do evento"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo do Evento *
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, type: e.target.value as 'B2B' | 'B2C' })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="B2B">B2B (Business to Business)</option>
                  <option value="B2C">B2C (Business to Consumer)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data de Início *
                </label>
                <input
                  type="datetime-local"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data de Término *
                </label>
                <input
                  type="datetime-local"
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Local do Evento *
              </label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Digite o local do evento"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição do Evento
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Descreva o evento, seus objetivos e características"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resultados Esperados
              </label>
              <textarea
                value={newEvent.expectedResults}
                onChange={(e) => setNewEvent({ ...newEvent, expectedResults: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Descreva os resultados que espera alcançar com este evento"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <button
                onClick={() => setActiveTab('list')}
                className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateEvent}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Cadastrar Evento</span>
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
