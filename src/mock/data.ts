export const mockUsers = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@participapro.com',
    password: 'admin123',
    role: 'admin',
    cpfCnpj: '000.000.000-00',
    profession: 'Administrador de Sistema',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'usuario@email.com',
    password: 'usuario123',
    role: 'participante',
    cpfCnpj: '123.456.789-00',
    profession: 'Desenvolvedor',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 3,
    name: 'Maria Santos',
    email: 'maria@email.com',
    password: 'maria123',
    role: 'participante',
    cpfCnpj: '987.654.321-00',
    profession: 'Designers',
    createdAt: '2024-02-01T14:15:00Z',
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
    active: true,
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
    active: false,
  },
  {
    id: '3',
    name: 'Conferência de Ecoturismo',
    type: 'B2B',
    startDate: '2025-05-20T08:00:00',
    endDate: '2025-05-22T18:00:00',
    location: 'Hotel Sustentável, Manaus',
    description: 'Conferência focada em práticas sustentáveis de turismo e preservação ambiental.',
    expectedResults: [],
    status: 'ongoing',
    active: false,
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
    active: false,
  },
]

export const mockFeedbacks = [
  {
    id: 1,
    author: 'João Silva',
    event: '2',
    rating: 5,
    comment:
      'Excelente evento! A organização foi impecável e os pratos estavam deliciosos. Recomendo fortemente para próximas edições.',
    date: '2025-06-10',
    status: 'pending',
    resultsAchieved: true,
    eventExpectedResults:
      'Atrair 5.000 visitantes e promover a gastronomia local com 15 restaurantes participantes.',
  },
  {
    id: 2,
    author: 'Maria Santos',
    event: '1',
    rating: 4,
    comment:
      'Bom evento para networking, mas poderia ter mais palestras técnicas. O local era adequado.',
    date: '2025-06-08',
    status: 'reviewed',
    resultsAchieved: false,
    eventExpectedResults:
      'Estabelecer 20 novos contatos com operadoras internacionais e fechar 5 parcerias estratégicas.',
  },
  {
    id: 3,
    author: 'Carlos Oliveira',
    event: '4',
    rating: 2,
    comment:
      'Evento abaixo das expectativas. Poucos expositores e organização confusa. Esperava mais qualidade.',
    date: '2025-06-06',
    status: 'responded',
    resultsAchieved: false,
    eventExpectedResults: 'Promover 50 artesãos locais e gerar R$100.000 em vendas diretas.',
  },
  {
    id: 4,
    author: 'Ana Costa',
    event: '2',
    rating: 5,
    comment:
      'Experiência incrível! Os chefs eram muito talentosos e a variedade de comidas foi surpreendente.',
    date: '2025-06-05',
    status: 'pending',
    resultsAchieved: true,
    eventExpectedResults:
      'Atrair 5.000 visitantes e promover a gastronomia local com 15 restaurantes participantes.',
  },
]
