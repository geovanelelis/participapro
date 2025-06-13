export const mockUsers = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@participapro.com',
    password: 'admin123',
    role: 'admin',
    position: 'Coordenador de Eventos',
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
    },
  },
]

export const mockEvents = [
  {
    id: '1',
    name: 'Feira de Turismo 2025',
    type: 'B2B',
    startDate: '2025-07-15T09:00:00',
    endDate: '2025-07-18T18:00:00',
    location: 'Centro de Convenções, São Paulo',
    description: 'Maior feira de turismo da América Latina, com foco em negócios e networking.',
    expectedResults:
      'Estabelecer 20 novos contatos com operadoras internacionais e fechar 5 parcerias estratégicas.',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Festival Gastronômico Regional',
    type: 'B2C',
    startDate: '2025-06-10T10:00:00',
    endDate: '2025-06-12T22:00:00',
    location: 'Parque Municipal, Belo Horizonte',
    description:
      'Festival que celebra a gastronomia regional com chefs renomados e atrações culturais.',
    expectedResults:
      'Atrair 5.000 visitantes e promover a gastronomia local com 15 restaurantes participantes.',
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'Conferência de Ecoturismo',
    type: 'B2B',
    startDate: '2025-05-20T08:00:00',
    endDate: '2025-05-22T18:00:00',
    location: 'Hotel Sustentável, Manaus',
    description: 'Conferência focada em práticas sustentáveis de turismo e preservação ambiental.',
    expectedResults:
      'Capacitar 30 agentes de turismo em práticas sustentáveis e estabelecer 10 novas parcerias.',
    status: 'ongoing',
  },
  {
    id: '4',
    name: 'Expo Artesanato',
    type: 'B2C',
    startDate: '2025-04-05T09:00:00',
    endDate: '2025-04-07T19:00:00',
    location: 'Centro Cultural, Salvador',
    description: 'Exposição de artesanato regional com workshops e vendas diretas.',
    expectedResults: 'Promover 50 artesãos locais e gerar R$100.000 em vendas diretas.',
    status: 'completed',
  },
]
