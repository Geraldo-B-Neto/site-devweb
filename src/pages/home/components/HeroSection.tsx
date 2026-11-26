import React, { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onOpenBriefing?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBriefing }) => {
  const giantRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const g = giantRef.current;
    if (!g) return;
    const w = g.parentElement;
    if (!w) return;

    const fit = () => {
      g.style.fontSize = '100px';
      const k = g.offsetWidth;
      if (k > 0) {
        g.style.fontSize = `${(100 * w.clientWidth) / k}px`;
      }
    };

    fit();
    window.addEventListener('resize', fit);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
    }

    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.hd}`}>
        <div className={styles.hdTop}>
          <p
            className={`${styles.hdAbout}`}
            style={{ '--a': 0 } as React.CSSProperties}
          >
            A DevWeb é uma agência de criação de sites em Patrocínio-MG que atende todo o
            Brasil. Criamos landing pages, sites institucionais e sistemas web sob medida, com
            código sólido e design pensado para transformar visitantes em clientes.
          </p>
          <div
            className={`${styles.cta} ${styles.hi}`}
            style={{ '--a': 2 } as React.CSSProperties}
          >
            <a
              className={`${styles.btn} ${styles.btnPrimary}`}
              href="#briefing"
              onClick={(e) => {
                if (onOpenBriefing) {
                  e.preventDefault();
                  onOpenBriefing();
                }
              }}
            >
              Quero meu site
            </a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#projetos">
              Ver nossos projetos
            </a>
          </div>
        </div>

        <div>
          <div
            className={`${styles.hdRow} ${styles.hi}`}
            style={{ '--a': 3 } as React.CSSProperties}
          >
            <span>Sua presença digital resolvida.</span>
            <span className={styles.offer2}>
              <b>Projetos a partir de R$ 790</b>
              <i></i>
              Seu site no ar em até 7 dias
            </span>
          </div>

          <div className={styles.gw}>
            <h1
              ref={giantRef}
              className={`${styles.giant} ${styles.hi}`}
              id="giant"
              style={{ '--a': 4 } as React.CSSProperties}
            >
              <span className="sr-only">
                DevWeb: criação de sites profissionais, landing pages e sistemas web.{' '}
              </span>
              <span aria-hidden="true">DevWeb Resolv</span>
            </h1>
          </div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
