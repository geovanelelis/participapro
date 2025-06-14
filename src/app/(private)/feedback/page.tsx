'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useFeedbackStore } from '@/contexts/feedbackStore'
import {
  MessageSquare,
  Star,
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  Calendar,
  User,
  Filter,
  Search,
  Download,
  BarChart3,
  Reply,
} from 'lucide-react'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  const {feedbacks} = useFeedbackStore()

  const statsCards = [
    {
      title: 'Total de Feedbacks',
      value: feedbacks.length.toString(),
      icon: <MessageSquare size={24} />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+18%',
      description: 'vs. mês anterior',
    },
    {
      title: 'Avaliação Média',
      value: '4.2',
      icon: <Star size={24} />,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      trend: '+0.3',
      description: 'melhoria contínua',
    },
    {
      title: 'NPS Score',
      value: '+42',
      icon: <TrendingUp size={24} />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+8%',
      description: 'satisfação',
    },
    {
      title: 'Pendentes',
      value: '12',
      icon: <AlertTriangle size={24} />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      trend: '-5%',
      description: 'aguardando resposta',
    },
  ]

  // Dados para gráficos
  const ratingData = [
    { rating: '5★', count: 45, color: '#10B981' },
    { rating: '4★', count: 32, color: '#3B82F6' },
    { rating: '3★', count: 18, color: '#F59E0B' },
    { rating: '2★', count: 8, color: '#EF4444' },
    { rating: '1★', count: 3, color: '#6B7280' },
  ]

  const sentimentData = [
    { name: 'Positivo', value: 68, color: '#10B981' },
    { name: 'Neutro', value: 22, color: '#F59E0B' },
    { name: 'Negativo', value: 10, color: '#EF4444' },
  ]

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'pending' && feedback.status === 'pending') ||
      (selectedFilter === 'positive' && feedback.sentiment === 'positive') ||
      (selectedFilter === 'negative' && feedback.sentiment === 'negative')

    return matchesSearch && matchesFilter
  })

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50'
      case 'negative':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-yellow-600 bg-yellow-50'
    }
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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 rounded-2xl text-white relative">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
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

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium">
                  <Download className="w-5 h-5" />
                  <span>Exportar Relatório</span>
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

      {/* Gráficos de Análise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Avaliações */}
        <Card className="card-modern border-0">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-yellow-600" />
              Distribuição de Avaliações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="rating" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey="count" fill="#e5a734" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* Gráfico de Sentimentos */}
        <Card className="card-modern border-0">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-yellow-600" />
              Análise de Sentimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
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

      {/* Lista de Feedbacks */}
      <div className="grid gap-4">
        {filteredFeedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 text-yellow-700 font-bold rounded-full flex items-center justify-center">
                  {fb.avatar}
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
              <span>{fb.event}</span>
              <span className="mx-1">•</span>
              <User className="w-4 h-4" />
              <span>{fb.category}</span>
            </div>

            <div className="flex items-center mt-2 mb-2">{renderStars(fb.rating)}</div>

            <p className="text-gray-700 text-sm italic mb-3">“{fb.comment}”</p>

            <div className="flex items-center justify-between">
              <div
                className={`text-xs px-3 py-1 rounded-full font-medium ${getSentimentColor(
                  fb.sentiment
                )}`}
              >
                Sentimento: {fb.sentiment}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span>{fb.helpful}</span>
                <button className="ml-4 flex items-center text-blue-600 hover:underline">
                  <Reply className="w-4 h-4 mr-1" />
                  Responder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
