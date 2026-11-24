import { SITE } from './siteConfig';
import { QA } from '../pages/home/data/faq';

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '');

const SERVICES = [
  {
    name: 'Criação de landing pages',
    description:
      'Página única, focada em uma oferta, com carregamento rápido, leitura perfeita no celular e pronta para campanhas no Instagram e no Google.',
  },
  {
    name: 'Criação de sites institucionais',
    description:
      'Site com várias páginas que apresenta a empresa, os serviços e a história, com estrutura pensada para aparecer nas buscas.',
  },
  {
    name: 'Desenvolvimento de sistemas web',
    description:
      'Sistemas que rodam no navegador e centralizam cadastros, agendamentos e relatórios, feitos sob medida para o processo do negócio.',
  },
];

/** Grafo JSON-LD (schema.org) da página inicial. */
export function buildStructuredData() {
  const org = `${SITE.url}/#organization`;
  const website = `${SITE.url}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': org,
        name: SITE.name,
        legalName: SITE.legalName,
        slogan: SITE.slogan,
        description: SITE.description,
        url: `${SITE.url}/`,
        logo: `${SITE.url}/logo.png`,
        image: `${SITE.url}/og-image.jpg`,
        telephone: SITE.telephone,
        email: SITE.email,
        priceRange: SITE.priceRange,
        address: { '@type': 'PostalAddress', ...SITE.address },
        areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
        founder: SITE.founders.map((name) => ({ '@type': 'Person', name })),
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE.telephone,
          email: SITE.email,
          contactType: 'sales',
          availableLanguage: 'Portuguese',
          areaServed: 'BR',
        },
        ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços de desenvolvimento web',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              description: s.description,
              provider: { '@id': org },
              areaServed: 'BR',
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': website,
        url: `${SITE.url}/`,
        name: SITE.name,
        inLanguage: 'pt-BR',
        publisher: { '@id': org },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/#webpage`,
        url: `${SITE.url}/`,
        name: SITE.title,
        description: SITE.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': website },
        about: { '@id': org },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE.url}/og-image.jpg` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/#faq`,
        mainEntity: QA.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.a) },
        })),
      },
    ],
  };
}
