import React, { useEffect, useRef, useState } from 'react';
import styles from './GallerySection.module.css';

import cromaticaDesktop from '../../../assets/images/site-cromatica-filmes-desktop.webp';
import cromaticaMobile from '../../../assets/images/site-cromatica-filmes-mobile.webp';
import cervoDesktop from '../../../assets/images/site-cervo-films-desktop.webp';
import cervoMobile from '../../../assets/images/site-cervo-films-mobile.webp';

interface GallerySectionProps {
  onOpenBriefing?: () => void;
}

const COL = ['#E5252A', '#7C3AED'];

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBriefing }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideRef = useRef(0);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  // Scroll and Tab Synchronization
  useEffect(() => {
    const pj = sectionRef.current;
    const pf = progressBarRef.current;
    if (!pj) return;

    const mq = window.matchMedia('(min-width:1000px) and (min-height:640px)');

    const upd = () => {
      if (!mq.matches) {
        if (currentSlideRef.current !== -2) {
          setCurrentSlide(-2);
        }
        return;
      }

      const r = pj.getBoundingClientRect();
      const h = pj.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-r.top / h, 0), 1);

      if (pf) {
        pf.style.transform = `scaleX(${p})`;
      }

      const target = p < 0.5 ? 0 : 1;
      if (currentSlideRef.current !== target) {
        setCurrentSlide(target);
      }
    };

    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();

    return () => {
      window.removeEventListener('scroll', upd);
      window.removeEventListener('resize', upd);
    };
  }, []);

  // 3D Parallax Tilt Effect on Pointer Move
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const mq = window.matchMedia('(min-width:1000px) and (min-height:640px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!mq.matches || rm || !sectionRef.current) return;

    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    sectionRef.current.style.setProperty('--rx', `${-y * 8}deg`);
    sectionRef.current.style.setProperty('--ry', `${x * 10}deg`);
    sectionRef.current.style.setProperty('--mx', `${x * 28}px`);
    sectionRef.current.style.setProperty('--my', `${y * 18}px`);
  };

  const handlePointerLeave = () => {
    if (!sectionRef.current) return;
    sectionRef.current.style.setProperty('--rx', '0deg');
    sectionRef.current.style.setProperty('--ry', '0deg');
    sectionRef.current.style.setProperty('--mx', '0px');
    sectionRef.current.style.setProperty('--my', '0px');
  };

  const handleTabClick = (idx: number) => {
    const pj = sectionRef.current;
    if (!pj) return;
    const r = pj.getBoundingClientRect();
    const h = pj.offsetHeight - window.innerHeight;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: window.scrollY + r.top + (idx ? 0.75 : 0.25) * h,
      behavior: rm ? 'auto' : 'smooth',
    });
  };

  // Canvas Particle Animation
  useEffect(() => {
    const cv = canvasRef.current;
    const sc = scRef.current;
    const sec = sectionRef.current;
    if (!cv || !sc || !sec) return;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let bw = 0;
    let PA: Array<{
      a: number;
      d: number;
      s: number;
      sp: number;
      al: number;
      p: boolean;
      ox: number;
      oy: number;
    }> = [];
    let mx = -1e4;
    let my = -1e4;
    let vis = true;
    const t0 = performance.now();
    let last = t0;
    let rafId: number | null = null;

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mq = window.matchMedia('(min-width:1000px) and (min-height:640px)');

    function g() {
      return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    }

    function init() {
      if (!sc || !cv || !ctx) return;
      const r = sc.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (mq.matches) {
        cx = W * 0.7;
        cy = H * 0.52;
        R = Math.min(H * 0.4, W * 0.24);
      } else {
        cx = W * 0.92;
        cy = H * 0.05;
        R = W * 0.55;
      }
      bw = R * 0.16;
      const n = W < 700 ? 900 : 1900;
      PA = [];
      for (let i = 0; i < n; i++) {
        PA.push({
          a: Math.random() * 6.2832,
          d: g() * bw,
          s: Math.random() < 0.2 ? 1.6 : 1,
          sp: (0.00005 + Math.random() * 0.00016) * (Math.random() < 0.5 ? -1 : 1),
          al: (0.2 + Math.random() * 0.6) * 0.6,
          p: Math.random() < 0.2,
          ox: 0,
          oy: 0,
        });
      }
      if (RM) draw(t0);
    }

    function draw(t: number) {
      if (!ctx) return;
      const s = (t - t0) / 1000;
      const dt = Math.min(t - last, 50);
      last = t;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const baseParticleColor = isDark ? '#ffffff' : '#111318';
      const col = COL[currentSlideRef.current === 1 ? 1 : 0];

      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass ? col : baseParticleColor;
        for (let i = 0; i < PA.length; i++) {
          const p = PA[i];
          if (p.p !== !!pass) continue;
          if (!RM) p.a += p.sp * dt;
          const r = R + p.d + Math.sin(s * 0.8 + p.a * 3) * R * 0.012;
          const x = cx + Math.cos(p.a) * r;
          const y = cy + Math.sin(p.a) * r;
          const dx = x - mx;
          const dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          let tx = 0;
          let ty = 0;
          if (d < 120 && d > 0.1) {
            const k = ((120 - d) * 0.45) / d;
            tx = dx * k;
            ty = dy * k;
          }
          p.ox += (tx - p.ox) * 0.12;
          p.oy += (ty - p.oy) * 0.12;
          ctx.globalAlpha = p.al;
          ctx.fillRect(x + p.ox, y + p.oy, p.s, p.s);
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(t: number) {
      if (vis) draw(t);
      rafId = requestAnimationFrame(loop);
    }

    const onScPointerMove = (e: PointerEvent) => {
      const r = sc.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };

    const onScPointerLeave = () => {
      mx = -1e4;
      my = -1e4;
    };

    sc.addEventListener('pointermove', onScPointerMove);
    sc.addEventListener('pointerleave', onScPointerLeave);

    const obs = new IntersectionObserver(
      (entries) => {
        vis = entries[0].isIntersecting;
      },
      { rootMargin: '100px' }
    );
    obs.observe(sec);

    window.addEventListener('resize', init);
    init();

    if (!RM) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      sc.removeEventListener('pointermove', onScPointerMove);
      sc.removeEventListener('pointerleave', onScPointerLeave);
      obs.disconnect();
      window.removeEventListener('resize', init);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStudyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOpenBriefing) {
      e.preventDefault();
      onOpenBriefing();
    }
  };

  const isSlide0On = currentSlide === -2 || currentSlide === 0;
  const isSlide1On = currentSlide === -2 || currentSlide === 1;

  return (
    <section
      ref={sectionRef}
      className={styles.pj}
      id="projetos"
      aria-label="Projetos que já colocamos no ar"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={scRef} className={styles.sc}>
        <canvas ref={canvasRef} className={styles.cv} aria-hidden="true" />

        <header className={styles.hb}>
          <div className={styles.w}>
            <div>
              <span className={styles.eb}>Projetos no ar</span>
              <h2 className={styles.fb}>Projetos que já colocamos no ar</h2>
            </div>
            <nav className={styles.tabs} aria-label="Projetos">
              <button
                type="button"
                aria-selected={currentSlide === 0}
                style={{ ['--d' as string]: '#E5252A' }}
                onClick={() => handleTabClick(0)}
              >
                01 Cromática Filmes
              </button>
              <button
                type="button"
                aria-selected={currentSlide === 1}
                style={{ ['--d' as string]: '#7C3AED' }}
                onClick={() => handleTabClick(1)}
              >
                02 Cervo Films
              </button>
            </nav>
            <span className={styles.cnt}>
              <b>{currentSlide === 1 ? '02' : '01'}</b> / 02
            </span>
          </div>
          <i className={styles.pg}>
            <i ref={progressBarRef} />
          </i>
        </header>

        <div className={styles.stack}>
          {/* Slide 01: Cromática Filmes */}
          <article
            className={`${styles.sl} ${isSlide0On ? styles.on : ''}`}
            style={{ ['--c' as string]: '#E5252A', ['--t2' as string]: '63%' }}
          >
            <div className={styles.gn} aria-hidden="true">
              01
            </div>
            <div className={`${styles.w} ${styles.g}`}>
              <div className={styles.tx}>
                <div className={styles.ey} style={{ ['--k' as string]: 0 }}>
                  <i />
                  Escola de música
                </div>
                <h3 style={{ ['--k' as string]: 1 }}>A maior escola de música de Patrocínio.</h3>
                <p style={{ ['--k' as string]: 2 }}>
                  A Cromática tem identidade forte, e o site precisava mostrar isso. Criamos uma{' '}
                  <b>página única, feita sob medida para a marca</b>, com um{' '}
                  <b>caminho claro até o contato</b> que{' '}
                  <b>abre rápido e funciona no celular</b>.
                </p>
                <div className={styles.meta} style={{ ['--k' as string]: 3 }}>
                  <div className={styles.av}>Cr</div>
                  <div>
                    <div className={styles.nm}>Cromática Filmes</div>
                    <div className={styles.sb}>Página de apresentação</div>
                  </div>
                  <div className={styles.vr} />
                  <div className={styles.stt}>
                    <b>Patrocínio · MG</b>
                    <span className={styles.sb}>Maior escola de música da cidade</span>
                  </div>
                </div>
                <div className={styles.ac} style={{ ['--k' as string]: 4 }}>
                  <a className={styles.bt} href="#briefing" onClick={handleStudyClick}>
                    Ler o estudo de caso →
                  </a>
                  <a
                    className={styles.ln}
                    href="https://cromaticafilmes.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitar o site ↗
                  </a>
                </div>
              </div>

              <div className={styles.vis}>
                <div className={styles.amb} />
                <div className={styles.tilt}>
                  <figure className={styles.fr}>
                    <div className={styles.bar}>
                      <span />
                      <span />
                      <span />
                      <em>cromaticafilmes.com.br</em>
                    </div>
                    <img src={cromaticaDesktop} alt="Página inicial do site da Cromática Filmes, escola de música em Patrocínio-MG, criado pela DevWeb" width="1100" height="521" loading="lazy" decoding="async" />
                  </figure>
                  <div className={styles.mb}>
                    <img src={cromaticaMobile} alt="Versão mobile do site da Cromática Filmes" width="520" height="952" loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.bdg}>
                    <svg viewBox="0 0 140 140" aria-hidden="true">
                      <circle
                        cx="70"
                        cy="70"
                        r="68"
                        className={styles.bdgCircle}
                        stroke="#E5252A"
                        strokeWidth="1.5"
                      />
                      <g className={styles.spin}>
                        <path id="pa" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" fill="none" />
                        <text
                          fontFamily="JetBrains Mono, monospace"
                          fontSize="10"
                          fontWeight="500"
                          className={styles.bdgText}
                        >
                          <textPath href="#pa" textLength="320" lengthAdjust="spacing">
                            A MAIOR ESCOLA DE MÚSICA DE PATROCÍNIO ·{' '}
                          </textPath>
                        </text>
                      </g>
                      <text
                        x="70"
                        y="77"
                        textAnchor="middle"
                        fontFamily="JetBrains Mono, monospace"
                        fontSize="21"
                        fontWeight="600"
                        className={styles.bdgText}
                      >
                        Cr
                      </text>
                    </svg>
                  </div>
                  <div className={`${styles.co} ${styles.c1}`} style={{ ['--k' as string]: 0 }}>
                    Visual sob medida
                  </div>
                  <div className={`${styles.co} ${styles.c2}`} style={{ ['--k' as string]: 1 }}>
                    Botão de contato na 1ª tela
                  </div>
                  <div className={`${styles.co} ${styles.c3}`} style={{ ['--k' as string]: 2 }}>
                    Abre rápido no celular
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Slide 02: Cervo Films */}
          <article
            className={`${styles.sl} ${isSlide1On ? styles.on : ''}`}
            style={{ ['--c' as string]: '#7C3AED', ['--t2' as string]: '42%' }}
          >
            <div className={styles.gn} aria-hidden="true">
              02
            </div>
            <div className={`${styles.w} ${styles.g}`}>
              <div className={styles.tx}>
                <div className={styles.ey} style={{ ['--k' as string]: 0 }}>
                  <i />
                  Agência audiovisual
                </div>
                <h3 style={{ ['--k' as string]: 1 }}>A maior agência audiovisual de Patrocínio.</h3>
                <p style={{ ['--k' as string]: 2 }}>
                  Uma agência desse tamanho precisa mostrar o que faz. Entregamos um <b>site completo</b> com os{' '}
                  <b>trabalhos</b>, os <b>serviços</b> e a <b>história</b> da produtora,{' '}
                  <b>tudo em um só lugar</b>, no computador e no celular.
                </p>
                <div className={styles.meta} style={{ ['--k' as string]: 3 }}>
                  <div className={styles.av}>CF</div>
                  <div>
                    <div className={styles.nm}>Cervo Films</div>
                    <div className={styles.sb}>Site completo</div>
                  </div>
                  <div className={styles.vr} />
                  <div className={styles.stt}>
                    <b>Patrocínio · MG</b>
                    <span className={styles.sb}>Maior agência audiovisual da cidade</span>
                  </div>
                </div>
                <div className={styles.ac} style={{ ['--k' as string]: 4 }}>
                  <a className={styles.bt} href="#briefing" onClick={handleStudyClick}>
                    Ler o estudo de caso →
                  </a>
                  <a
                    className={styles.ln}
                    href="https://cervofilms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitar o site ↗
                  </a>
                </div>
              </div>

              <div className={styles.vis}>
                <div className={styles.amb} />
                <div className={styles.tilt}>
                  <figure className={styles.fr}>
                    <div className={styles.bar}>
                      <span />
                      <span />
                      <span />
                      <em>cervofilms.com</em>
                    </div>
                    <img src={cervoDesktop} alt="Página inicial do site da Cervo Films, agência audiovisual em Patrocínio-MG, criado pela DevWeb" width="1100" height="516" loading="lazy" decoding="async" />
                  </figure>
                  <div className={styles.mb}>
                    <img src={cervoMobile} alt="Versão mobile do site da Cervo Films" width="520" height="949" loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.bdg}>
                    <svg viewBox="0 0 140 140" aria-hidden="true">
                      <circle
                        cx="70"
                        cy="70"
                        r="68"
                        className={styles.bdgCircle}
                        stroke="#7C3AED"
                        strokeWidth="1.5"
                      />
                      <g className={styles.spin}>
                        <path id="pb" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" fill="none" />
                        <text
                          fontFamily="JetBrains Mono, monospace"
                          fontSize="10"
                          fontWeight="500"
                          className={styles.bdgText}
                        >
                          <textPath href="#pb" textLength="320" lengthAdjust="spacing">
                            A MAIOR AGÊNCIA AUDIOVISUAL DE PATROCÍNIO ·{' '}
                          </textPath>
                        </text>
                      </g>
                      <text
                        x="70"
                        y="77"
                        textAnchor="middle"
                        fontFamily="JetBrains Mono, monospace"
                        fontSize="21"
                        fontWeight="600"
                        className={styles.bdgText}
                      >
                        CF
                      </text>
                    </svg>
                  </div>
                  <div className={`${styles.co} ${styles.c1}`} style={{ ['--k' as string]: 0 }}>
                    Trabalhos, serviços e história
                  </div>
                  <div className={`${styles.co} ${styles.c2}`} style={{ ['--k' as string]: 1 }}>
                    Computador e celular
                  </div>
                  <div className={`${styles.co} ${styles.c3}`} style={{ ['--k' as string]: 2 }}>
                    Portfólio a um clique
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className={styles.hint} aria-hidden="true">
          <span>
            {currentSlide === 1 ? 'Fim da seleção · continue rolando' : 'Role para o próximo projeto'}
          </span>
          <i>↓</i>
        </div>

        <div className={styles.mq} aria-hidden="true">
          <div className={styles.mt}>
            <span>Landing pages</span>
            <i>◆</i>
            <span>Sites institucionais</span>
            <i>◆</i>
            <span>Sistemas web</span>
            <i>◆</i>
            <span>Patrocínio · MG</span>
            <i>◆</i>
            <span>Código sólido. Presença que vende.</span>
            <i>◆</i>
            <span>Landing pages</span>
            <i>◆</i>
            <span>Sites institucionais</span>
            <i>◆</i>
            <span>Sistemas web</span>
            <i>◆</i>
            <span>Patrocínio · MG</span>
            <i>◆</i>
            <span>Código sólido. Presença que vende.</span>
            <i>◆</i>
          </div>
          <div className={styles.mt}>
            <span>Landing pages</span>
            <i>◆</i>
            <span>Sites institucionais</span>
            <i>◆</i>
            <span>Sistemas web</span>
            <i>◆</i>
            <span>Patrocínio · MG</span>
            <i>◆</i>
            <span>Código sólido. Presença que vende.</span>
            <i>◆</i>
            <span>Landing pages</span>
            <i>◆</i>
            <span>Sites institucionais</span>
            <i>◆</i>
            <span>Sistemas web</span>
            <i>◆</i>
            <span>Patrocínio · MG</span>
            <i>◆</i>
            <span>Código sólido. Presença que vende.</span>
            <i>◆</i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
