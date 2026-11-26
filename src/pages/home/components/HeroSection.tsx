import React, { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onOpenBriefing?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBriefing }) => {
  const giantRef = useRef<HTMLHeadingElement>(null);

  // Ajusta o "DevWeb Resolv" para o desenho das letras encostar nas duas bordas da tela
  useEffect(() => {
    const g = giantRef.current;
    const w = g?.parentElement;
    if (!g || !w) return;
    const visual = g.querySelector<HTMLElement>('[aria-hidden="true"]');
    const text = visual?.textContent || 'DevWeb Resolv';
    const ctx = document.createElement('canvas').getContext('2d');

    const fit = () => {
      // Bloco de borda a borda da janela, ignorando a margem lateral do topo
      const vw = document.documentElement.clientWidth;
      w.style.marginLeft = '0px';
      w.style.width = '';
      w.style.marginLeft = `${-w.getBoundingClientRect().left}px`;
      w.style.width = `${vw}px`;

      g.style.fontSize = '100px';
      g.style.marginLeft = '0px';
      const cs = getComputedStyle(g);
      const pad = parseFloat(cs.paddingLeft) || 0;

      // Mede a tinta real das letras (sem as sobras laterais da fonte)
      let inkStart = 0;
      let inkWidth = 0;
      if (ctx && 'letterSpacing' in ctx) {
        ctx.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = cs.letterSpacing;
        const m = ctx.measureText(text);
        inkStart = -m.actualBoundingBoxLeft;
        inkWidth = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      }
      if (!(inkWidth > 0)) {
        inkWidth = g.offsetWidth - pad * 2; // navegadores sem medição de tinta
      }

      const size = (100 * vw) / inkWidth;
      const k = size / 100;
      g.style.fontSize = `${size}px`;
      g.style.marginLeft = `${-(pad * k + inkStart * k)}px`;
    };

    fit();
    window.addEventListener('resize', fit);
    if (document.fonts?.ready) document.fonts.ready.then(fit);
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
