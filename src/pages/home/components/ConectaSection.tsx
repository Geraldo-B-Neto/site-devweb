import React, { useEffect, useRef } from 'react';
import styles from './ConectaSection.module.css';
import { SITE } from '../../../seo/siteConfig';

import plaquinha360 from '../../../assets/images/devweb-conecta-plaquinha-nfc-qr-code-360.webp';
import plaquinha560 from '../../../assets/images/devweb-conecta-plaquinha-nfc-qr-code-560.webp';
import plaquinha800 from '../../../assets/images/devweb-conecta-plaquinha-nfc-qr-code-800.webp';

const whatsappUrl = (message: string) => `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

interface Plan {
  id: string;
  name: string;
  desc: string;
  price: string;
  billing: string;
  items: string[];
  cta: string;
  message: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'plaquinha',
    name: 'Plaquinha NFC',
    desc: 'Para quem já tem uma página e só quer o acesso rápido no balcão.',
    price: 'R$ 19,90',
    billing: 'pagamento único',
    items: [
      'Display personalizado com NFC e QR Code',
      'Aponta para o endereço que você informar',
      'Sem mensalidade',
    ],
    cta: 'Quero a plaquinha',
    message: 'Olá, quero saber mais sobre a Plaquinha NFC da DevWeb!',
  },
  {
    id: 'conecta',
    name: 'DevWeb Conecta',
    desc: 'Plaquinha e página digital do seu negócio, prontas para usar.',
    price: 'R$ 69,90',
    billing: 'implantação + R$ 9,90/mês',
    items: [
      'Plaquinha com NFC e QR Code',
      'Página personalizada com WhatsApp, Instagram, Pix, Google, site, endereço e links',
      'Hospedagem e manutenção básica incluídas',
    ],
    cta: 'Quero o Conecta',
    message: 'Olá, quero saber mais sobre o DevWeb Conecta!',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Conecta Premium',
    desc: 'Para quem quer vender com catálogo e acompanhar os resultados.',
    price: 'R$ 99,90',
    billing: 'implantação + R$ 14,90/mês',
    items: [
      'Tudo do DevWeb Conecta',
      'Apresentação visual ampliada',
      'Catálogo simples e banners promocionais',
      'Estatísticas de cliques',
    ],
    cta: 'Quero o Premium',
    message: 'Olá, quero saber mais sobre o Conecta Premium da DevWeb!',
  },
];

const STEPS = [
  'O cliente aproxima o celular ou escaneia o QR Code',
  'Abre a página do seu negócio, sem baixar nada',
  'Chama no WhatsApp, paga no Pix, avalia e segue você',
];

/* Ícones simples (decorativos) dos botões da página de exemplo */
const ICONS: Record<string, React.ReactNode> = {
  whatsapp: <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20z" />,
  pix: <path d="M12 3l9 9-9 9-9-9 9-9zm0 5l-4 4 4 4 4-4-4-4z" />,
  google: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
    </>
  ),
  site: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
};

const PHONE_BUTTONS = [
  { icon: 'whatsapp', label: 'Chamar no WhatsApp', primary: true },
  { icon: 'pix', label: 'Pagar com Pix' },
  { icon: 'google', label: 'Avaliar no Google' },
  { icon: 'instagram', label: 'Seguir no Instagram' },
  { icon: 'site', label: 'Nosso site' },
  { icon: 'map', label: 'Como chegar' },
];

export const ConectaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Mesma animação de entrada ao rolar das outras seções (.rv -> .in)
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const els = sec.querySelectorAll(`.${styles.rv}`);

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add(styles.in));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="conecta" className={styles.cn} ref={sectionRef} aria-labelledby="conecta-title">
      <div className={styles.w}>
        <div className={styles.top}>
          {/* Coluna do texto */}
          <div className={styles.copy}>
            <span className={`${styles.eb} ${styles.rv}`}>Linha DevWeb Conecta</span>
            <h2 id="conecta-title" className={`${styles.title} ${styles.rv}`}>
              Seu negócio inteiro a um toque do cliente.
            </h2>
            <p className={`${styles.lead} ${styles.rv}`}>
              Uma plaquinha com NFC e QR Code no balcão leva o cliente direto ao seu WhatsApp, Pix,
              Instagram, avaliação no Google e endereço. Sem digitar nada.
            </p>
            <ol className={`${styles.steps} ${styles.rv}`}>
              {STEPS.map((step, i) => (
                <li key={i} className={i === STEPS.length - 1 ? styles.last : undefined}>
                  <span className={styles.no} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Coluna visual: plaquinha + celular com a página de exemplo */}
          <figure className={`${styles.visual} ${styles.rv}`}>
            <div className={styles.stage}>
              <img
                className={styles.photo}
                src={plaquinha560}
                srcSet={`${plaquinha360} 360w, ${plaquinha560} 560w, ${plaquinha800} 800w`}
                sizes="(max-width: 900px) 56vw, 340px"
                width="560"
                height="812"
                loading="lazy"
                decoding="async"
                alt="Plaquinha DevWeb em acrílico com QR Code e área NFC, com os dizeres “Sua presença digital resolvida” e os serviços sites institucionais, landing pages e sistemas web"
              />

              <div className={styles.phone} aria-hidden="true">
                <div className={styles.screen}>
                  <div className={styles.url}>conecta.devwebresolv.com.br/seunegocio</div>
                  <div className={styles.profile}>
                    <span className={styles.avatar}>S</span>
                    <b>Seu Negócio</b>
                    <small>Atendimento de segunda a sábado</small>
                  </div>
                  <ul className={styles.links}>
                    {PHONE_BUTTONS.map((btn) => (
                      <li key={btn.label} className={btn.primary ? styles.primaryLink : undefined}>
                        <svg viewBox="0 0 24 24">{ICONS[btn.icon]}</svg>
                        {btn.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <figcaption className={styles.caption}>Imagem ilustrativa</figcaption>
          </figure>
        </div>

        {/* Planos */}
        <div className={styles.plans}>
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`${styles.card} ${plan.featured ? styles.featured : ''} ${styles.rv}`}
              aria-labelledby={`plano-${plan.id}`}
            >
              {plan.featured && <span className={styles.badge}>Recomendado</span>}
              <h3 id={`plano-${plan.id}`} className={styles.name}>
                {plan.name}
              </h3>
              <p className={styles.desc}>{plan.desc}</p>
              <p className={styles.price}>
                <b>{plan.price}</b>
                <span>{plan.billing}</span>
              </p>
              <ul className={styles.items}>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className={`${styles.bt} ${plan.featured ? '' : styles.g}`}
                href={whatsappUrl(plan.message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <p className={`${styles.note} ${styles.rv}`}>
          Valores de lançamento. O escopo de cada plano é combinado antes de começar.
        </p>
      </div>
    </section>
  );
};

export default ConectaSection;
