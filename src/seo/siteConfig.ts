/**
 * Dados oficiais da empresa usados em meta tags, dados estruturados,
 * sitemap.xml e robots.txt. Mantenha estas informações verdadeiras e
 * idênticas às do Google Business Profile (consistência NAP).
 */
export const SITE = {
  /** Domínio canônico, sem barra no final. */
  url: 'https://getdevweb.com.br',
  name: 'DevWeb',
  legalName: 'DevWeb',
  title: 'Criação de Sites Profissionais e Landing Pages | DevWeb',
  description:
    'Criação de sites, landing pages e sistemas web em Patrocínio-MG e todo o Brasil. Sites rápidos, responsivos e prontos para o Google. A partir de R$ 690.',
  slogan: 'Código sólido. Presença que vende.',
  telephone: '+55-34-99841-8664',
  whatsapp: 'https://wa.me/5534998418664',
  email: 'contato@devweb.com.br',
  address: {
    addressLocality: 'Patrocínio',
    addressRegion: 'MG',
    addressCountry: 'BR',
  },
  areaServed: ['Patrocínio', 'Minas Gerais', 'Brasil'],
  priceRange: 'A partir de R$ 690',
  founders: ['Geraldo Bruno', 'Douglas Miquéias'],
  /** Perfis oficiais (Instagram, LinkedIn, GitHub...). Preencha com as URLs reais. */
  sameAs: [] as string[],
} as const;
