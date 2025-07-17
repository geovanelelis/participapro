'use client'

import React, { useState } from 'react'
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Star,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import EventDetailsModal from '@/components/ui/EventDetailsModal'

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

const EventsHomepage = () => {
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const events: Event[] = [
    {
      id: '1',
      name: 'Feira de Turismo 2025',
      type: 'B2B',
      startDate: '2025-07-15T09:00:00',
      endDate: '2025-07-18T18:00:00',
      location: 'Centro de Convenções, São Paulo',
      description:
        'Maior feira de turismo da América Latina, com foco em negócios e networking. Este evento reúne os principais players do setor turístico, oferecendo oportunidades únicas de networking, apresentação de novos produtos e serviços, e discussões sobre as tendências do mercado. Participantes terão acesso a palestras com especialistas renomados, workshops práticos e uma extensa área de exposição com as mais recentes inovações do setor.',
      expectedResults:
        'Estabelecer 20 novos contatos com operadoras internacionais e fechar 5 parcerias estratégicas para expansão do negócio no mercado latino-americano.',
      status: 'upcoming',
      active: true,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
      category: 'Turismo',
      participants: '2000+',
    },
    {
      id: '2',
      name: 'Festival Gastronômico Regional',
      type: 'B2C',
      startDate: '2025-06-10T10:00:00',
      endDate: '2025-06-12T22:00:00',
      location: 'Parque Municipal, Belo Horizonte',
      description:
        'Festival que celebra a gastronomia regional com chefs renomados e atrações culturais. Uma experiência única que combina sabores autênticos da culinária mineira com apresentações artísticas locais. O evento conta com praça de alimentação diversificada, oficinas culinárias, degustações especiais e shows musicais que celebram a rica cultura gastronômica da região.',
      expectedResults:
        'Atrair 5.000 visitantes e promover a gastronomia local com 15 restaurantes participantes, gerando visibilidade para os estabelecimentos locais e fortalecendo o turismo gastronômico da região.',
      status: 'upcoming',
      active: false,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
      category: 'Gastronomia',
      participants: '5000+',
    },
    {
      id: '3',
      name: 'Conferência de Ecoturismo',
      type: 'B2B',
      startDate: '2025-05-20T08:00:00',
      endDate: '2025-05-22T18:00:00',
      location: 'Hotel Sustentável, Manaus',
      description:
        'Conferência focada em práticas sustentáveis de turismo e preservação ambiental. Este evento pioneiro reúne especialistas em sustentabilidade, operadores de ecoturismo e conservacionistas para discutir o futuro do turismo responsável na Amazônia. Inclui visitas técnicas a projetos de conservação, workshops sobre turismo de base comunitária e apresentações de cases de sucesso em ecoturismo.',
      expectedResults:
        'Desenvolver diretrizes para o ecoturismo sustentável na região amazônica e estabelecer uma rede de colaboração entre operadores e comunidades locais.',
      status: 'ongoing',
      active: false,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
      category: 'Sustentabilidade',
      participants: '800+',
    },
    {
      id: '4',
      name: 'Expo Artesanato',
      type: 'B2C',
      startDate: '2025-04-05T09:00:00',
      endDate: '2025-04-07T19:00:00',
      location: 'Centro Cultural, Salvador',
      description:
        'Exposição de artesanato regional com workshops e vendas diretas. Uma celebração da rica tradição artesanal baiana, apresentando trabalhos únicos de artesãos locais em cerâmica, tecelagem, marcenaria e joalheria. O evento oferece oportunidade de compra direta dos produtores, workshops para aprender técnicas tradicionais e apresentações culturais que contextualizam cada arte apresentada.',
      expectedResults:
        'Promover 50 artesãos locais e gerar R$100.000 em vendas diretas, fortalecendo a economia criativa local e preservando as tradições artesanais da Bahia.',
      status: 'completed',
      active: false,
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop',
      category: 'Artesanato',
      participants: '3000+',
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const getStatusBadge = (status: 'upcoming' | 'ongoing' | 'completed') => {
    const statusMap = {
      upcoming: { text: 'Em Breve', color: 'bg-blue-100 text-blue-800' },
      ongoing: { text: 'Acontecendo', color: 'bg-green-100 text-green-800' },
      completed: { text: 'Finalizado', color: 'bg-gray-100 text-gray-800' },
    }

    return statusMap[status] || statusMap.upcoming
  }
  const handleEventDetails = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('eventos')
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ParticipaPro</h1>
                <p className="text-blue-100 text-sm">Eventos Imperdíveis</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <button
                onClick={scrollToEvents}
                className="hover:text-blue-200 transition-colors cursor-pointer"
              >
                Eventos
              </button>
              <a href="#sobre" className="hover:text-blue-200 transition-colors">
                Sobre
              </a>
              <a href="#footer" className="hover:text-blue-200 transition-colors">
                Contato
              </a>
              <button
                className="cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                onClick={() => router.push('/auth')}
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Descubra Eventos
            <span className="text-blue-600"> Extraordinários</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Conecte-se com as melhores experiências do país. Turismo, gastronomia, sustentabilidade
            e muito mais te esperam.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToEvents}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              Explorar Eventos <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <a
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              href="#footer"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </section>

      {/* Eventos */}
      <section id="eventos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Eventos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Participe dos melhores eventos do país e amplie suas conexões profissionais e pessoais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event) => {
              const statusBadge = getStatusBadge(event.status)
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.color}`}
                      >
                        {statusBadge.text}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {event.type}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(event.startDate)} - {formatDate(event.endDate)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants} participantes esperados
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-500 ml-1">4.2</span>
                      </div>
                      <button
                        onClick={() => handleEventDetails(event)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                      >
                        Ver Detalhes <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Eventos Realizados</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Participantes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Empresas Parceiras</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8</div>
              <div className="text-blue-100">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Sobre a ParticipaPro</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Somos uma plataforma dedicada a conectar pessoas através de eventos extraordinários.
              Nossa missão é facilitar o acesso a experiências únicas que promovem networking,
              aprendizado e crescimento pessoal e profissional.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Eventos Curados</h3>
                <p className="text-gray-600">
                  Selecionamos cuidadosamente os melhores eventos para você
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Networking</h3>
                <p className="text-gray-600">
                  Conecte-se com profissionais e entusiastas da sua área
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Experiências Únicas</h3>
                <p className="text-gray-600">
                  Viva momentos inesquecíveis em eventos de alta qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Participar?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Cadastre-se agora e não perca nenhum evento incrível
          </p>
          <button
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
            onClick={() => router.push('/auth')}
          >
            Criar Conta Gratuita
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-6 h-6" />
                <span className="text-xl font-bold">ParticipaPro</span>
              </div>
              <p className="text-gray-400">Conectando pessoas através de eventos extraordinários</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Eventos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Turismo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gastronomia
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sustentabilidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Artesanato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>contato@participapro.com</span>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Facebook className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ParticipaPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <EventDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} event={selectedEvent} />
    </div>
  )
}

export default EventsHomepage
