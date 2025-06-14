'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import {
  CheckCircle,
  Database,
  Globe,
  Link,
  Mail,
  MessageSquare,
  Settings,
  Shield,
  Star,
  Zap,
  Webhook,
  Key,
  Clock,
  Search,
  ExternalLink,
  Trash2,
  Users,
  DollarSign,
} from 'lucide-react'
import { useState } from 'react'

export default function Integrations() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const integrationCategories = [
    {
      title: 'Comunicação',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      count: 8,
    },
    {
      title: 'Análise & Dados',
      icon: <Database className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      count: 12,
    },
    {
      title: 'Automação',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      count: 6,
    },
    {
      title: 'Pagamentos',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      count: 4,
    },
  ]

  const availableIntegrations = [
    {
      name: 'WhatsApp Business',
      description: 'Envie notificações e confirmações via WhatsApp',
      icon: <MessageSquare className="w-8 h-8" />,
      category: 'Comunicação',
      status: 'available',
      rating: 4.8,
      users: '2.1M',
      color: 'bg-green-500',
      features: ['Mensagens automáticas', 'Templates aprovados', 'Relatórios de entrega'],
    },
    {
      name: 'Google Analytics',
      description: 'Monitore o comportamento dos usuários em tempo real',
      icon: <Globe className="w-8 h-8" />,
      category: 'Análise & Dados',
      status: 'connected',
      rating: 4.9,
      users: '5.2M',
      color: 'bg-blue-500',
      features: ['Tracking avançado', 'Conversões', 'Audiências personalizadas'],
    },
    {
      name: 'Mailchimp',
      description: 'Automatize campanhas de email marketing',
      icon: <Mail className="w-8 h-8" />,
      category: 'Comunicação',
      status: 'available',
      rating: 4.6,
      users: '1.8M',
      color: 'bg-yellow-500',
      features: ['Templates responsivos', 'Segmentação avançada', 'A/B Testing'],
    },
    {
      name: 'Zapier',
      description: 'Conecte com mais de 5000 aplicações',
      icon: <Zap className="w-8 h-8" />,
      category: 'Automação',
      status: 'available',
      rating: 4.7,
      users: '3.4M',
      color: 'bg-orange-500',
      features: ['Workflows automatizados', 'Triggers personalizados', 'Multi-step Zaps'],
    },
    {
      name: 'Stripe',
      description: 'Processe pagamentos de forma segura',
      icon: <Shield className="w-8 h-8" />,
      category: 'Pagamentos',
      status: 'connected',
      rating: 4.9,
      users: '4.1M',
      color: 'bg-purple-500',
      features: ['Pagamentos recorrentes', 'Multi-moedas', 'Fraud protection'],
    },
    {
      name: 'Slack',
      description: 'Receba notificações da equipe em tempo real',
      icon: <MessageSquare className="w-8 h-8" />,
      category: 'Comunicação',
      status: 'available',
      rating: 4.5,
      users: '12M',
      color: 'bg-pink-500',
      features: ['Canais personalizados', 'Bots integrados', 'Notificações inteligentes'],
    },
    {
      name: 'PayPal',
      description: 'Aceite pagamentos via PayPal',
      icon: <DollarSign className="w-8 h-8" />,
      category: 'Pagamentos',
      status: 'available',
      rating: 4.4,
      users: '8.5M',
      color: 'bg-blue-600',
      features: ['Checkout express', 'Proteção ao comprador', 'Multi-moedas'],
    },
    {
      name: 'Discord',
      description: 'Notificações e comunicação via Discord',
      icon: <MessageSquare className="w-8 h-8" />,
      category: 'Comunicação',
      status: 'available',
      rating: 4.3,
      users: '150M',
      color: 'bg-indigo-500',
      features: ['Bots personalizados', 'Webhooks', 'Notificações em tempo real'],
    },
    {
      name: 'Make (Integromat)',
      description: 'Automação visual avançada',
      icon: <Zap className="w-8 h-8" />,
      category: 'Automação',
      status: 'available',
      rating: 4.6,
      users: '500K',
      color: 'bg-purple-600',
      features: ['Visual workflow builder', 'Automações complexas', 'Error handling'],
    },
  ]

  const connectedIntegrations = availableIntegrations.filter(
    (integration) => integration.status === 'connected'
  )

  const filteredIntegrations = availableIntegrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const apiStats = [
    {
      title: 'APIs Ativas',
      value: '12',
      icon: <Link className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Chamadas Hoje',
      value: '1,247',
      icon: <Database className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Uptime',
      value: '99.9%',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Latência Média',
      value: '45ms',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  const recentActivity = [
    {
      integration: 'Google Analytics',
      action: 'Dados sincronizados',
      time: '2 min atrás',
      status: 'success',
      icon: <Globe className="w-4 h-4" />,
    },
    {
      integration: 'Stripe',
      action: 'Pagamento processado',
      time: '5 min atrás',
      status: 'success',
      icon: <Shield className="w-4 h-4" />,
    },
    {
      integration: 'WhatsApp Business',
      action: 'Erro de autenticação',
      time: '15 min atrás',
      status: 'error',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      integration: 'Mailchimp',
      action: 'Campanha enviada',
      time: '1 hora atrás',
      status: 'success',
      icon: <Mail className="w-4 h-4" />,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-modern bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white rounded-2xl shadow-xl">
        <div className="relative z-10 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                  <Link className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Integrações</h1>
                  <p className="text-purple-100 text-lg">
                    Conecte o ParticipaPro com suas ferramentas favoritas
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6 lg:mt-0">
              <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300">
                <Key className="w-4 h-4" />
                <span>API Keys</span>
              </button>
              <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300">
                <Webhook className="w-4 h-4" />
                <span>Webhooks</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {apiStats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.color}`}>{stat.icon}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integrações Conectadas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            Integrações Conectadas
          </h2>
          <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {connectedIntegrations.length} ativas
          </Badge>
        </div>

        {connectedIntegrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {connectedIntegrations.map((integration, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-2xl text-white mr-3 ${integration.color}`}>
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{integration.name}</h3>
                        <Badge className="bg-green-100 text-green-800 mt-1 px-2 py-1 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Conectado
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                  <div className="space-y-2">
                    {integration.features.slice(0, 2).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{integration.rating}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Gerenciar
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-gray-300 text-center p-8 mb-8">
            <div className="text-gray-500">
              <Link className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Nenhuma integração conectada</h3>
              <p className="text-sm">
                Conecte suas primeiras integrações para começar a automatizar seus processos
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Categorias e Busca */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categorias */}
        <div className="lg:w-1/4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorias</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Todas</span>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                  {availableIntegrations.length}
                </span>
              </div>
            </button>
            {integrationCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.title)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.title
                    ? `${category.bgColor} ${category.textColor} border-2 border-current`
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {category.icon}
                    <span className="ml-2 font-medium">{category.title}</span>
                  </div>
                  <span className="text-sm bg-white/50 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Atividade Recente */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${
                          activity.status === 'success'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{activity.integration}</p>
                        <p className="text-xs text-gray-500">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integrações Disponíveis */}
        <div className="lg:w-3/4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Integrações Disponíveis
            </h2>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar integrações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-2xl text-white mr-3 ${integration.color}`}>
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{integration.name}</h3>
                        <Badge
                          className={`mt-1 px-2 py-1 rounded-full text-xs ${
                            integration.status === 'connected'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {integration.status === 'connected' ? 'Conectado' : 'Disponível'}
                        </Badge>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{integration.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{integration.users}</span>
                      </div>
                    </div>

                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        integration.status === 'connected'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {integration.status === 'connected' ? 'Configurar' : 'Conectar'}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Nenhuma integração encontrada
              </h3>
              <p className="text-gray-500">Tente ajustar sua busca ou filtros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
