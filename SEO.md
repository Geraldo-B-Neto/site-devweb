# SEO — DevWeb

Checklist do padrão de entrega aplicado neste site. Dados da empresa ficam em
`src/seo/siteConfig.ts` (domínio, telefone, e-mail, cidade, redes sociais).

## Implementado

**On-page**
- [x] Title único com palavra-chave: "Criação de Sites Profissionais e Landing Pages | DevWeb"
- [x] Meta description personalizada (~150 caracteres)
- [x] H1 descritivo (texto acessível + visual "DevWeb Resolv"), H2 por seção, H3 por subtópico
- [x] Títulos e descrições dos serviços sempre presentes no HTML (antes só o serviço ativo era renderizado)
- [x] Palavras-chave naturais no texto principal (criação de sites, landing pages, Patrocínio-MG)
- [x] Imagens WebP com nomes descritivos, ALT, `width`/`height`, `loading="lazy"` e `decoding="async"`

**Técnico**
- [x] Pré-renderização: o HTML completo da página é gerado no build (`scripts/prerender.mjs`)
- [x] Canonical, `robots`, Open Graph, Twitter Card, `theme-color` e favicons
- [x] `sitemap.xml` e `robots.txt` gerados no build com o domínio de `siteConfig.ts`
- [x] Página 404 personalizada (`public/404.html`, `noindex`)
- [x] Fontes reduzidas às 3 famílias realmente usadas (antes eram 10)
- [x] Tema escuro aplicado antes da pintura (evita flash)

**Dados estruturados (JSON-LD)**
- [x] `ProfessionalService` (LocalBusiness) com endereço, telefone, área atendida e catálogo de serviços
- [x] `WebSite`, `WebPage` e `FAQPage` (gerado a partir de `src/pages/home/data/faq.ts`)

## Pendente (fora do código)
- [ ] Adicionar o LinkedIn (rodapé e `sameAs`) quando houver perfil
- [ ] Google Search Console: verificar domínio e enviar `/sitemap.xml`
- [ ] Google Business Profile com nome, telefone e cidade idênticos ao `siteConfig.ts`
- [ ] Google Analytics 4 e eventos de conversão (cliques no WhatsApp / briefing)
- [ ] Validar em https://search.google.com/test/rich-results e rodar PageSpeed Insights após o deploy
- [ ] Estratégia de avaliações reais e backlinks (parceiros, diretórios locais)
