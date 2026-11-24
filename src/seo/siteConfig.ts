/**
 * Dados oficiais da empresa usados em meta tags, dados estruturados,
 * sitemap.xml e robots.txt. Mantenha estas informações verdadeiras e
 * idênticas às do Google Business Profile (consistência NAP).
 */
export const SITE = {
  /** Domínio canônico, sem barra no final. */
  url: 'https://devwebresolv.com.br',
  name: 'DevWeb',
  legalName: 'DevWeb',
  title: 'Criação de Sites Profissionais e Landing Pages | DevWeb',
  description:
    'Criação de sites, landing pages e sistemas web em Patrocínio-MG e todo o Brasil. Sites rápidos, responsivos e prontos para o Google. A partir de R$ 690.',
  slogan: 'Código sólido. Presença que vende.',
  telephone: '+55-34-99731-5975',
  whatsapp: 'https://wa.me/5534997315975',
  email: 'devwebofc@gmail.com',
  address: {
    addressLocality: 'Patrocínio',
    addressRegion: 'MG',
    addressCountry: 'BR',
  },
  areaServed: ['Patrocínio', 'Minas Gerais', 'Brasil'],
  priceRange: 'A partir de R$ 690',
  founders: ['Geraldo Bruno', 'Douglas Miquéias'],
  /** Perfis oficiais (Instagram, LinkedIn, GitHub...). Preencha com as URLs reais. */
  sameAs: ['https://www.instagram.com/devwebofc/', 'https://github.com/devwebofc'] as string[],
} as const;
