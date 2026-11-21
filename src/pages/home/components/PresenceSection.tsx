import React, { useEffect, useRef } from 'react';
import styles from './PresenceSection.module.css';

export const PresenceSection: React.FC = () => {
  const sdwRef = useRef<HTMLDivElement>(null);
  const sdvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = sdwRef.current;
    const v = sdvRef.current;
    if (!w || !v) return;

    const handleResize = () => {
      const k = w.clientWidth / 560;
      v.style.transform = `scale(${k})`;
      w.style.height = `${660 * k}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.sd} id="presenca">
      {/* Shared gradient for rings & chart */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="sdg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F14895" />
            <stop offset="1" stopColor="#E82824" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.sdIn}>
        <div className={styles.sdTxt}>
          <p className={styles.sdPre}>PARE DE PERDER VENDAS NO DIGITAL</p>
          <h2>
            O cliente procura no Google, não te acha e <em>fecha com o concorrente.</em>
          </h2>
          <p className={styles.sdSub}>
            Ter um site amador, ou não ter nenhum, está custando caro para o seu negócio todos os dias.{' '}
            <strong>A DevWeb Resolv</strong> cria a estrutura digital que passa autoridade imediata e faz o seu WhatsApp
            tocar.
          </p>
          <div className={styles.sdCta}>
            <a
              className={styles.btnPrimary}
              href="https://wa.me/5534997315975?text=Ol%C3%A1%2C%20quero%20resolver%20minha%20presen%C3%A7a%20online!"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resolver minha presença online{' '}
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
            <a className={styles.btnGhost} href="#projetos">
              Ver nossos projetos
            </a>
          </div>
        </div>

        <div className={styles.sdWrap} id="sdw" ref={sdwRef}>
          <div
            className={styles.sdVis}
            id="sdv"
            ref={sdvRef}
            role="img"
            aria-label="Ilustração de um celular mostrando a empresa em primeiro lugar nos resultados de busca, com tráfego em alta e site rápido"
          >
            <div className={styles.sdGlow}></div>

            {/* Glowing Orbit Rings */}
            <svg
              className={styles.sdRing}
              style={{ left: 0, top: 210, width: 470, height: 210, transform: 'rotate(-20deg)' }}
              viewBox="0 0 200 90"
              aria-hidden="true"
            >
              <ellipse className="b" cx="100" cy="45" rx="96" ry="38" />
              <ellipse className="m" cx="100" cy="45" rx="96" ry="38" pathLength="600" />
            </svg>
            <svg
              className={`${styles.sdRing} ${styles.r2}`}
              style={{ left: 170, top: 360, width: 440, height: 190, transform: 'rotate(14deg)' }}
              viewBox="0 0 200 90"
              aria-hidden="true"
            >
              <ellipse className="b" cx="100" cy="45" rx="96" ry="38" />
              <ellipse className="m" cx="100" cy="45" rx="96" ry="38" pathLength="600" />
            </svg>

            <div className={styles.sdShadow}></div>

            {/* Floating 3D Phone Mockup */}
            <div className={styles.sdPh} aria-hidden="true">
              <div className={styles.sdPhone}>
                <div className={styles.sdScr}>
                  <i className={styles.sdIsl}></i>
                  <div className={styles.sdSt}>
                    <span>9:41</span>
                    <span className={styles.sdIc}>
                      <b></b>
                      <b></b>
                      <b></b>
                    </span>
                  </div>
                  <div className={styles.sdSearch}>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#9AA1B2"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="M16 16l4 4" />
                    </svg>
                    sua empresa
                  </div>
                  <div className={styles.sdTabs}>
                    <span className={styles.on}>Todas</span>
                    <span>Maps</span>
                    <span>Imagens</span>
                    <span>Shopping</span>
                  </div>

                  {/* Top Google Result: DevWeb / Sua Empresa */}
                  <div className={styles.sdRes}>
                    <div className={styles.sdRh}>
                      <span className={styles.sdLg}>SE</span>
                      <div>
                        <b>
                          Sua Empresa <i className={styles.sdVf}></i>
                        </b>
                        <small>https://www.suaempresa.com.br</small>
                      </div>
                    </div>
                    <div className={styles.sdStars}>★★★★★</div>
                    <p>Qualidade, confiança e os melhores serviços para você.</p>
                    <div className={styles.sdWa}>
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 20l1.4-4.2A8 8 0 1 1 8.3 18.7z" />
                      </svg>
                      Falar no WhatsApp
                    </div>
                  </div>

                  {/* Competitor Warnings */}
                  <div className={styles.sdCmp}>
                    <b>Concorrente Exemplo</b>
                    <small>https://www.concorrente.com</small>
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        width="13"
                        height="13"
                        fill="none"
                        stroke="#D9A441"
                        strokeWidth="2.2"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 3l10 18H2z" />
                        <path d="M12 10v5M12 18v.5" />
                      </svg>
                      Site desatualizado
                    </span>
                    <u></u>
                    <u className={styles.s}></u>
                  </div>

                  <div className={styles.sdCmp}>
                    <b>Outra Empresa</b>
                    <small>https://www.outraempresa.com</small>
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        width="13"
                        height="13"
                        fill="none"
                        stroke="#9AA1B2"
                        strokeWidth="2.2"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                      Sem SSL
                    </span>
                    <u></u>
                    <u className={styles.s}></u>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating KPI Glassmorphism Card A */}
            <div className={`${styles.sdCard} ${styles.ca}`} aria-hidden="true">
              <small>Tráfego em alta</small>
              <b>+287%</b>
              <svg viewBox="0 0 100 34" fill="none" aria-hidden="true">
                <polygon
                  points="2,32 14,26 24,28 36,19 48,21 60,11 74,15 94,3 94,32"
                  fill="url(#sdg)"
                  opacity=".18"
                />
                <polyline
                  points="2,32 14,26 24,28 36,19 48,21 60,11 74,15 94,3"
                  stroke="url(#sdg)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Floating KPI Glassmorphism Card B: PageSpeed Gauge */}
            <div className={`${styles.sdCard} ${styles.cb}`} aria-hidden="true">
              <svg viewBox="0 0 100 58" fill="none" aria-hidden="true">
                <path className={styles.gaugeTrack} d="M10 52A40 40 0 0 1 90 52" strokeWidth="8" strokeLinecap="round" />
                <path
                  d="M10 52A40 40 0 0 1 90 52"
                  pathLength="1"
                  stroke="url(#sdg)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray=".9 1"
                />
                <path d="M50 52L74 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx="50" cy="52" r="5" fill="currentColor" />
              </svg>
              <small>PageSpeed</small>
              <b>99/100</b>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.sdNote}>Exemplo ilustrativo de resultado.</p>
    </section>
  );
};

export default PresenceSection;
