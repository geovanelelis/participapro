'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  BarChart3,
  Download,
  FileText,
  Filter,
  PieChart,
  Target,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function Reports() {
  const reportTypes = [
    {
      title: 'Relatório Executivo',
      description: 'Visão geral completa dos eventos',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-slate-500',
      textColor: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    {
      title: 'Esperado vs Alcançado',
      description: 'Comparativo de expectativas e resultados',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Análise de Participantes',
      description: 'Métricas detalhadas dos participantes',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Tendências Temporais',
      description: 'Evolução dos indicadores ao longo do tempo',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  const performanceData = [
    { evento: 'Festival Gastronômico', esperado: 500, alcancado: 650, satisfacao: 4.8 },
    { evento: 'Feira de Artesanato', esperado: 300, alcancado: 280, satisfacao: 4.2 },
    { evento: 'Congresso de Turismo', esperado: 800, alcancado: 920, satisfacao: 4.6 },
    { evento: 'Mostra Cultural', esperado: 400, alcancado: 380, satisfacao: 4.4 },
    { evento: 'Workshop de Negócios', esperado: 150, alcancado: 175, satisfacao: 4.7 },
  ]

  const monthlyTrends = [
    { mes: 'Jan', eventos: 4, participantes: 1200, conversao: 65 },
    { mes: 'Fev', eventos: 3, participantes: 980, conversao: 62 },
    { mes: 'Mar', eventos: 5, participantes: 1800, conversao: 68 },
    { mes: 'Abr', eventos: 7, participantes: 2500, conversao: 72 },
    { mes: 'Mai', eventos: 5, participantes: 1900, conversao: 70 },
    { mes: 'Jun', eventos: 6, participantes: 2200, conversao: 75 },
  ]

  const categoryDistribution = [
    { name: 'B2B', value: 45, color: '#3B82F6' },
    { name: 'B2C', value: 35, color: '#10B981' },
    { name: 'Interno', value: 20, color: '#F59E0B' },
  ]

  const kpiCards = [
    {
      title: 'Taxa de Sucesso',
      value: '87%',
      change: '+12%',
      trend: 'up',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Média de Participantes',
      value: '340',
      change: '+23',
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    {
      title: 'ROI Médio',
      value: '2.4x',
      change: '+0.3x',
      trend: 'up',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Eventos Pendentes',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl text-white relative">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">Relatórios & Analytics</h1>
                    <p className="text-green-100 text-lg">
                      Análises detalhadas de performance e resultados dos eventos
                    </p>
                  </div>
                </div>
                <p className="text-green-100 text-lg leading-relaxed max-w-lg">
                  Organize contatos de eventos, monitore interações e fortaleça parcerias
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300">
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="card-modern card-hover border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${kpi.bgColor} ${kpi.color}`}>{kpi.icon}</div>
                <div
                  className={`flex items-center space-x-1 ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm font-semibold">{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{kpi.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tipos de Relatório */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tipos de Relatório</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTypes.map((report, index) => (
            <Card key={index} className="card-modern card-hover border-0 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl ${report.bgColor} ${report.textColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {report.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <button className="w-full bg-gradient-to-r from-slate-500 to-slate-600 text-white py-2 px-4 rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Gerar</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gráficos de Análise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Esperado vs Alcançado */}
        <Card className="card-modern border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
              <Target className="w-5 h-5 mr-2 text-slate-600" />
              Esperado vs Alcançado
            </CardTitle>
            <p className="text-sm text-gray-600">Comparativo de expectativas e resultados</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="evento"
                    stroke="#6B7280"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey="esperado" fill="#94A3B8" name="Esperado" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="alcancado" fill="#3B82F6" name="Alcançado" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tendências Mensais */}
        <Card className="card-modern border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Tendências Mensais
            </CardTitle>
            <p className="text-sm text-gray-600">Evolução de participantes e conversão</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="mes" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="participantes"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    name="Participantes"
                  />
                  <Line
                    type="monotone"
                    dataKey="conversao"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                    name="Taxa de Conversão (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Categoria e Lista de Eventos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuição por Categoria */}
        <Card className="card-modern border-0">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Distribuição por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {categoryDistribution.map((item, index) => (
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

        {/* Lista de Relatórios Recentes */}
        <div className="lg:col-span-2">
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-slate-600" />
                Relatórios Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.slice(0, 4).map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {event.evento.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{event.evento}</h4>
                        <p className="text-xs text-gray-600">
                          {event.alcancado} participantes • Satisfação {event.satisfacao}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`badge-modern ${
                          event.alcancado >= event.esperado ? 'badge-green' : 'badge-yellow'
                        }`}
                      >
                        {event.alcancado >= event.esperado ? 'Meta atingida' : 'Abaixo da meta'}
                      </Badge>
                      <button className="text-slate-600 hover:text-slate-800 transition-colors p-2 hover:bg-slate-50 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
