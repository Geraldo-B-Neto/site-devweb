import React, { useEffect, useRef } from 'react';
import styles from './ResultsSection.module.css';

interface Particle {
  a: number;
  d: number;
  s: number;
  sp: number;
  al: number;
  p: boolean;
  ox: number;
  oy: number;
}

export const ResultsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const cv = canvasRef.current;
    if (!sec || !cv) return;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let bw = 0;
    let P: Particle[] = [];
    let mx = -1e4;
    let my = -1e4;
    let vis = true;
    const t0 = performance.now();
    let last = t0;
    let rafId: number | null = null;

    const RM = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    function g() {
      return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    }

    function init() {
      if (!sec || !cv || !ctx) return;
      const r = sec.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (W < 900) {
        cx = W * 0.92;
        cy = H * 0.03;
        R = W * 0.55;
      } else {
        cx = W * 0.1;
        cy = H * 0.88;
        R = W * 0.26;
      }
      bw = R * 0.17;
      const n = W < 700 ? 900 : 1900;
      P = [];
      for (let i = 0; i < n; i++) {
        P.push({
          a: Math.random() * 6.2832,
          d: g() * bw,
          s: Math.random() < 0.2 ? 1.6 : 1,
          sp: (0.00005 + Math.random() * 0.00016) * (Math.random() < 0.5 ? -1 : 1),
          al: (0.2 + Math.random() * 0.6) * 0.7,
          p: Math.random() < 0.14,
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
      const baseParticle = isDark ? '#ffffff' : '#111318';

      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass ? '#F14895' : baseParticle;
        for (let i = 0; i < P.length; i++) {
          const p = P[i];
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

    const onPointerMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };

    const onPointerLeave = () => {
      mx = -1e4;
      my = -1e4;
    };

    sec.addEventListener('pointermove', onPointerMove);
    sec.addEventListener('pointerleave', onPointerLeave);

    const visObserver = new IntersectionObserver(
      (entries) => {
        vis = entries[0].isIntersecting;
      },
      { rootMargin: '100px' }
    );
    visObserver.observe(sec);

    function count(el: HTMLElement) {
      const n = Number(el.dataset.n || 0);
      if (RM) {
        el.textContent = String(n);
        return;
      }
      const a = performance.now();
      const D = 1100;
      el.textContent = '0';
      function f(time: number) {
        const p = Math.min((time - a) / D, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(n * ease));
        if (p < 1) requestAnimationFrame(f);
      }
      requestAnimationFrame(f);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            const counters = e.target.querySelectorAll<HTMLElement>('.cu');
            counters.forEach(count);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    const rvElements = sec.querySelectorAll(`.${styles.rv}`);
    rvElements.forEach((el) => io.observe(el));

    window.addEventListener('resize', init);
    init();

    if (!RM) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      sec.removeEventListener('pointermove', onPointerMove);
      sec.removeEventListener('pointerleave', onPointerLeave);
      visObserver.disconnect();
      io.disconnect();
      window.removeEventListener('resize', init);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.pv} id="provas" aria-labelledby="pt">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.w}>
        <div className={styles.l}>
          <h2 id="pt" className={`${styles.title} ${styles.rv}`}>
            Tecnologia que aparece no caixa
          </h2>
          <p className={`${styles.sub} ${styles.rv}`}>
            O que importa para quem empreende: ser encontrado, passar confiança e receber pedidos.
          </p>
          <p className={`${styles.nt} ${styles.rv}`}>
            <i></i>
            <span>Sem números inventados. Aqui só entra o que podemos provar.</span>
          </p>
        </div>

        <ol className={styles.ol}>
          {/* Item 1 */}
          <li className={`${styles.item} ${styles.rv}`}>
            <div className={styles.nd}>
              <svg viewBox="0 0 44 44" aria-hidden="true">
                <use href="#cb-res" />
              </svg>
            </div>
            <div className={styles.bd}>
              <div className={styles.num}>
                <span className="cu" data-n="2">
                  2
                </span>
              </div>
              <div>
                <div className={styles.lb}>
                  <i></i>Líderes de Patrocínio
                </div>
                <p className={styles.ds}>
                  A maior escola de música e a maior agência audiovisual da cidade têm site feito pela DevWeb.
                </p>
              </div>
            </div>
          </li>

          {/* Item 2 */}
          <li className={`${styles.item} ${styles.rv}`}>
            <div className={styles.nd}>
              <svg viewBox="0 0 44 44" aria-hidden="true">
                <use href="#cb-res" />
              </svg>
            </div>
            <div className={styles.bd}>
              <div className={styles.num}>
                <span className="cu" data-n="2">
                  2
                </span>
              </div>
              <div>
                <div className={styles.lb}>
                  <i></i>Analistas de sistemas
                </div>
                <p className={styles.ds}>
                  São eles que cuidam do seu projeto, do primeiro papo ao suporte depois da entrega.
                </p>
              </div>
            </div>
          </li>

          {/* Item 3 */}
          <li className={`${styles.item} ${styles.rv}`}>
            <div className={styles.nd}>
              <svg viewBox="0 0 44 44" aria-hidden="true">
                <use href="#cb-res" />
              </svg>
            </div>
            <div className={styles.bd}>
              <div className={styles.num}>
                <span className="cu" data-n="4">
                  4
                </span>
              </div>
              <div>
                <div className={styles.lb}>
                  <i></i>Etapas
                </div>
                <p className={styles.ds}>
                  Conversa, protótipo, desenvolvimento e publicação, com você acompanhando cada uma.
                </p>
              </div>
            </div>
          </li>

          {/* Item 4 */}
          <li className={`${styles.item} ${styles.rv}`}>
            <div className={styles.nd}>
              <svg viewBox="0 0 44 44" aria-hidden="true">
                <use href="#cb-res" />
              </svg>
            </div>
            <div className={styles.bd}>
              <div className={styles.num}>
                <small>R$</small>
                <span className="cu" data-n="690">
                  690
                </span>
              </div>
              <div>
                <div className={styles.lb}>
                  <i></i>A partir de
                </div>
                <p className={styles.ds}>
                  Valor inicial dos projetos. O orçamento final é combinado na conversa, antes de começar.
                </p>
              </div>
            </div>
          </li>

          {/* Item 5 (Placeholder item)
          <li className={`${styles.item} ${styles.ph} ${styles.rv}`}>
            <div className={styles.nd}>
              <svg viewBox="0 0 44 44" aria-hidden="true">
                <use href="#cb-res" />
              </svg>
            </div>
            <div className={styles.bd}>
              <div className={styles.num}>+?</div>
              <div>
                <div className={styles.lb}>
                  <i></i>A preencher
                </div>
                <p className={styles.ds}>
                  Aqui entra o primeiro resultado medido de um cliente (contatos, pedidos ou vendas), com a fonte do dado.
                </p>
              </div>
            </div>
          </li> */}
        </ol>
      </div>

      {/* SVG Definitions for Isometric Cube */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="tg-res" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.75" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
          <g id="cb-res" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none">
            <polygon points="22,5 37,13.5 22,22 7,13.5" fill="url(#tg-res)" />
            <polygon points="7,13.5 22,22 22,39 7,30.5" className="cubeSideFace" />
            <polygon points="37,13.5 22,22 22,39 37,30.5" className="cubeSideFace" />
            <polygon points="22,5 37,13.5 37,30.5 22,39 7,30.5 7,13.5" />
          </g>
        </defs>
      </svg>
    </section>
  );
};

export default ResultsSection;
