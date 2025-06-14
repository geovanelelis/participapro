'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useContactStore } from '@/contexts/contactStore'
import {
  Users,
  UserPlus,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Star,
  MessageCircle,
  MoreVertical,
  Download,
  Upload,
  Eye,
  Edit,
} from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const { contacts } = useContactStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const statsCards = [
    {
      title: 'Total de Contatos',
      value: contacts.length.toString(),
      icon: <Users size={24} />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+12%',
      description: 'vs. mês anterior',
    },
    {
      title: 'Novos Contatos',
      value: '8',
      icon: <UserPlus size={24} />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+24%',
      description: 'este mês',
    },
    {
      title: 'Parceiros Ativos',
      value: '12',
      icon: <Building size={24} />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '+8%',
      description: 'engajamento',
    },
    {
      title: 'Taxa de Conversão',
      value: '68%',
      icon: <Star size={24} />,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      trend: '+5%',
      description: 'melhoria',
    },
  ]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'b2b' && contact.type === 'B2B') ||
      (selectedFilter === 'b2c' && contact.type === 'B2C') ||
      (selectedFilter === 'partners' && contact.status === 'partner')

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-green'
      case 'prospect':
        return 'badge-blue'
      case 'partner':
        return 'badge-purple'
      default:
        return 'badge-gray'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'prospect':
        return 'Prospect'
      case 'partner':
        return 'Parceiro'
      default:
        return 'Inativo'
    }
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
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">Gestão de Contatos</h1>
                    <p className="text-green-100 text-lg">Gerencie relacionamentos e parcerias</p>
                  </div>
                </div>
                <p className="text-green-100 text-lg leading-relaxed max-w-lg">
                  Organize contatos de eventos, monitore interações e fortaleça parcerias
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium">
                  <UserPlus className="w-5 h-5" />
                  <span>Novo Contato</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium">
                  <Upload className="w-5 h-5" />
                  <span>Importar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="card-modern card-hover border-0 relative overflow-hidden">
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
        ))}
      </div>

      {/* Filtros e Busca */}
      <Card className="card-modern border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar contatos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                />
              </div>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todos os Contatos</option>
                <option value="b2b">B2B</option>
                <option value="b2c">B2C</option>
                <option value="partners">Parceiros</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contatos */}
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            Lista de Contatos
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            {filteredContacts.length} contatos encontrados
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-semibold mr-3">
                      {contact.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.position}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {contact.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {contact.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {contact.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge
                    className={`badge-modern ${
                      contact.type === 'B2B' ? 'badge-blue' : 'badge-green'
                    }`}
                  >
                    {contact.type}
                  </Badge>
                  <Badge className={`badge-modern ${getStatusColor(contact.status)}`}>
                    {getStatusLabel(contact.status)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {contact.rating}/5
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(contact.lastContact).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Eventos Participados:</p>
                  <div className="flex flex-wrap gap-1">
                    {contact.events.slice(0, 2).map((event, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                      >
                        {event}
                      </span>
                    ))}
                    {contact.events.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                        +{contact.events.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Contatar
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
