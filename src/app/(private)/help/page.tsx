'use client'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/contexts/authStore'
import {
  Book,
  Calendar,
  ChevronRight,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Play,
  Search,
  Shield,
  Sparkles,
  Users,
  Video,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

export default function Help() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const faqItems = [
    {
      category: 'Eventos',
      icon: <Calendar className="w-5 h-5" />,
      questions: [
        {
          question: 'Como cadastrar um novo evento no sistema?',
          answer:
            'Para cadastrar um evento, acesse a seção "Eventos" no menu lateral, clique em "Novo Evento" e preencha os dados cadastrais como nome, data, local, tipo (B2B ou B2C) e métricas esperadas. O sistema permitirá reutilizar métricas de eventos anteriores.',
        },
        {
          question: 'Como definir métricas para um evento?',
          answer:
            'Durante o cadastro do evento, você pode definir métricas personalizadas que serão utilizadas para comparar expectativas vs resultados. As métricas podem ser reutilizadas em eventos futuros para manter consistência.',
        },
        {
          question: 'Posso editar um evento após criá-lo?',
          answer:
            'Sim, eventos podem ser editados através da lista de eventos. Clique no evento desejado e selecione a opção "Editar". Algumas informações podem ter restrições dependendo do status do evento.',
        },
      ],
    },
    {
      category: 'Participantes',
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: 'Como os participantes registram suas expectativas?',
          answer:
            'Os participantes devem acessar o sistema, selecionar o evento e informar suas previsões com base nas métricas estabelecidas pelo administrador. O sistema permite edição das previsões dentro do prazo definido.',
        },
        {
          question: 'Como importar dados de participantes?',
          answer:
            'O sistema permite importação de dados de inscrição dos participantes através de arquivos CSV ou integração com plataformas de eventos. Acesse "Eventos" > "Participantes" > "Importar Dados".',
        },
        {
          question: 'Participantes podem ver dados de outros estandes?',
          answer:
            'Não. Por questões de privacidade, cada participante tem acesso apenas às informações do seu próprio estande ou área de atuação.',
        },
      ],
    },
    {
      category: 'Relatórios',
      icon: <FileText className="w-5 h-5" />,
      questions: [
        {
          question: 'Como gerar relatórios de expectativa vs resultado?',
          answer:
            'Após o evento ser finalizado e os dados processados, acesse "Relatórios" e selecione o evento desejado. O sistema gerará automaticamente a comparação entre expectativas e resultados alcançados.',
        },
        {
          question: 'Posso exportar relatórios em PDF?',
          answer:
            'Sim, todos os relatórios podem ser exportados em formato PDF. Clique no botão "Exportar" no canto superior direito do relatório gerado.',
        },
        {
          question: 'Qual a diferença entre relatórios quantitativos e qualitativos?',
          answer:
            'O ParticipaPro foca exclusivamente em dados quantitativos (números, métricas, estatísticas). Dados qualitativos (opiniões, comentários) não são processados pelo sistema.',
        },
      ],
    },
  ]

  const quickGuides = [
    {
      title: 'Primeiros Passos',
      description: 'Aprenda a configurar seu primeiro evento',
      icon: <Play className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      duration: '5 min',
    },
    {
      title: 'Configurando Métricas',
      description: 'Como definir e reutilizar métricas',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      duration: '8 min',
    },
    {
      title: 'Gerando Relatórios',
      description: 'Extraia insights dos seus eventos',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      duration: '10 min',
    },
    {
      title: 'Gerenciando Participantes',
      description: 'Importação e acompanhamento',
      icon: <Users className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      duration: '7 min',
    },
  ]

  const supportChannels = [
    {
      title: 'Chat ao Vivo',
      description: 'Converse conosco em tempo real',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-blue-500',
      available: true,
      action: 'Iniciar Chat',
    },
    {
      title: 'E-mail Suporte',
      description: 'suporte@participapro.com.br',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-green-500',
      available: true,
      action: 'Enviar E-mail',
    },
    {
      title: 'Telefone',
      description: '(31) 3000-0000 - Seg à Sex, 8h às 18h',
      icon: <Phone className="w-6 h-6" />,
      color: 'bg-amber-500',
      available: true,
      action: 'Ligar Agora',
    },
    {
      title: 'Documentação',
      description: 'Guias detalhados e manuais',
      icon: <Book className="w-6 h-6" />,
      color: 'bg-purple-500',
      available: true,
      action: 'Acessar Docs',
    },
  ]

  const filteredFAQ = faqItems
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="card-modern bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl text-white relative">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">Central de Ajuda 🆘</h1>
                    <p className="text-blue-100 text-lg">Como podemos ajudar você hoje?</p>
                  </div>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed max-w-lg">
                  Encontre respostas, guias e suporte para aproveitar ao máximo o ParticipaPro
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium">
                  <Video className="w-5 h-5" />
                  <span>Tutoriais</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 text-white font-medium">
                  <MessageCircle className="w-5 h-5" />
                  <span>Suporte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <Card className="card-modern border-0">
        <CardContent className="p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquise por dúvidas, funcionalidades ou problemas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Guias Rápidos */}
      <div>
        <div className="flex items-center mb-6">
          <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Guias Rápidos</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickGuides.map((guide, index) => (
            <div key={index} className="hover:-translate-y-1 transition-all duration-300">
              <Card className="card-modern card-hover border-0 relative overflow-hidden h-fit">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${guide.color} opacity-5`}
                ></div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${guide.bgColor} ${guide.textColor}`}>
                      {guide.icon}
                    </div>
                    <Badge className="badge-modern badge-blue text-xs">{guide.duration}</Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{guide.description}</p>

                    <div className="flex items-center text-blue-600 font-medium text-sm">
                      <span>Assistir agora</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Perguntas Frequentes */}
      <div>
        <div className="flex items-center mb-6">
          <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Perguntas Frequentes</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {(searchQuery ? filteredFAQ : faqItems).map((category, categoryIndex) => (
            <Card key={categoryIndex} className="card-modern border-0 h-full">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                    {category.icon}
                  </div>
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {searchQuery && filteredFAQ.length === 0 && (
          <Card className="card-modern border-0 text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Não encontramos respostas para "{searchQuery}". Tente outros termos ou entre em
                contato conosco.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Falar com Suporte
              </button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Canais de Suporte */}
      <div>
        <div className="flex items-center mb-6">
          <Shield className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Precisa de Mais Ajuda?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="card-modern card-hover border-0 cursor-pointer group h-fit">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {channel.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{channel.description}</p>

                <div className="flex items justify-center">
                  {channel.available && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-600 font-medium align-bottom">Disponível</span>
                    </div>
                  )}
                </div>

                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors align-bottom">
                  {channel.action}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Informações do Sistema */}
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            Informações do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-2">Versão Atual</h4>
              <p className="text-2xl font-bold text-blue-600">v1.0</p>
              <p className="text-xs text-blue-700 mt-1">Atualizada em 13/06/2025</p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-900 mb-2">Status do Sistema</h4>
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <p className="text-lg font-bold text-green-600">Online</p>
              </div>
              <p className="text-xs text-green-700 mt-1">Todos os serviços funcionando</p>
            </div>

            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <h4 className="font-semibold text-amber-900 mb-2">Próxima Manutenção</h4>
              <p className="text-lg font-bold text-amber-600">20/06/2025</p>
              <p className="text-xs text-amber-700 mt-1">Manutenção programada - 2h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
