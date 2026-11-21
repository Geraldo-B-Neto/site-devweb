import React, { useEffect, useRef, useState } from 'react';
import styles from './ProcessSection.module.css';

interface ProcessSectionProps {
  onOpenBriefing?: () => void;
}

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

const STEP_NAMES = [
  'Conversa',
  'Protótipo',
  'Desenvolvimento',
  'Publicação e suporte',
];

const STEPS_DATA = [
  {
    no: '01',
    title: 'Conversa',
    desc: 'Entendemos seu negócio, seu cliente e o resultado que você espera.',
    you: 'Conta o que o negócio precisa',
    we: 'Ouvimos e definimos o caminho',
  },
  {
    no: '02',
    title: 'Protótipo',
    desc: 'Você vê e aprova o visual antes de qualquer linha de código.',
    you: 'Aprova o visual',
    we: 'Desenhamos a proposta',
  },
  {
    no: '03',
    title: 'Desenvolvimento',
    desc: 'Construímos com código limpo, testado e pronto para crescer.',
    you: 'Acompanha o andamento',
    we: 'Programamos e testamos',
  },
  {
    no: '04',
    title: 'Publicação e suporte',
    desc: 'Colocamos no ar e ficamos por perto para ajustes e evolução.',
    you: 'Recebe o site no ar',
    we: 'Publicamos e damos suporte',
  },
];

/* Isometric Cube SVG Generator matching the design file exactly */
const V: Record<string, [number, number]> = {
  T: [44, 10],
  UR: [73, 27],
  LR: [73, 61],
  B: [44, 78],
  LL: [15, 61],
  UL: [15, 27],
  C: [44, 44],
};

function pt(f: number, u: number, v: number): string {
  const o = f ? V.C : V.UL;
  const a = f
    ? [V.UR[0] - V.C[0], V.UR[1] - V.C[1]]
    : [V.C[0] - V.UL[0], V.C[1] - V.UL[1]];
  const b = f
    ? [V.B[0] - V.C[0], V.B[1] - V.C[1]]
    : [V.LL[0] - V.UL[0], V.LL[1] - V.UL[1]];
  return (
    (o[0] + a[0] * u + b[0] * v).toFixed(1) +
    ',' +
    (o[1] + a[1] * u + b[1] * v).toFixed(1)
  );
}

function rc(f: number, u0: number, v0: number, u1: number, v1: number, fill: string, stroke: string, o?: number) {
  return `<polygon points="${pt(f, u0, v0)} ${pt(f, u1, v0)} ${pt(f, u1, v1)} ${pt(f, u0, v1)}" fill="${fill}" stroke="${stroke}" stroke-width="1.2" opacity="${o || 1}"/>`;
}

function ln(f: number, u0: number, u1: number, v: number, c: string) {
  const p0 = pt(f, u0, v).split(',');
  const p1 = pt(f, u1, v).split(',');
  return `<line x1="${p0[0]}" y1="${p0[1]}" x2="${p1[0]}" y2="${p1[1]}" stroke="${c}" stroke-width="1.8" stroke-linecap="round" opacity=".85"/>`;
}

function P(a: string[]) {
  return a.map((k) => V[k].join(',')).join(' ');
}

function generateCubeSvg(s: number) {
  const id = 'tg-proc-' + s;
  const h = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop class="cubeStop0" offset="0" stop-opacity="${s === 3 ? '.9' : '.65'
    }"/><stop class="cubeStop1" offset="1" stop-opacity=".05"/></linearGradient></defs>`;
  let x = '';
  const dash = s === 0 ? ' stroke-dasharray="4 5" class="dsh"' : '';
  const fill = (c: string) => (s === 0 ? 'none' : c);

  x += `<g class="cubeOutline" stroke-width="1.6" stroke-linejoin="round"${dash}>`;
  x += `<polygon points="${P(['T', 'UR', 'C', 'UL'])}" fill="${s === 0 ? 'none' : `url(#${id})`
    }"/><polygon class="cubeSide" points="${P(['UL', 'C', 'B', 'LL'])}" fill="${fill(
      'var(--cb-side, #050506)'
    )}"/><polygon class="cubeSide" points="${P(['UR', 'LR', 'B', 'C'])}" fill="${fill(
      'var(--cb-side, #050506)'
    )}"/><polygon points="${P(['T', 'UR', 'LR', 'B', 'LL', 'UL'])}" fill="none"/></g>`;

  if (s === 1) {
    x +=
      rc(0, 0.14, 0.16, 0.86, 0.42, 'none', '#F14895') +
      rc(0, 0.14, 0.56, 0.5, 0.84, 'none', 'var(--cb-stroke, #111318)', 0.55) +
      ln(1, 0.15, 0.85, 0.2, 'var(--cb-stroke, #111318)') +
      ln(1, 0.15, 0.65, 0.45, 'var(--cb-stroke, #111318)') +
      ln(1, 0.15, 0.75, 0.7, 'var(--cb-stroke, #111318)');
  }

  if (s === 2) {
    const L = [0.7, 0.45, 0.8, 0.55, 0.35];
    const R = [0.55, 0.8, 0.4, 0.7, 0.5];
    for (let k = 0; k < 5; k++) {
      x +=
        ln(0, 0.15, 0.15 + L[k] * 0.7, 0.14 + k * 0.17, k === 2 ? '#F14895' : 'var(--cb-stroke, #111318)') +
        ln(1, 0.15, 0.15 + R[k] * 0.7, 0.14 + k * 0.17, k === 1 ? '#F14895' : 'var(--cb-stroke, #111318)');
    }
  }

  if (s === 3) {
    x += `<ellipse class="cubeOrbit" cx="44" cy="44" rx="46" ry="14" fill="none" stroke-opacity=".3" stroke-dasharray="3 5"/><circle cx="44" cy="27" r="3" fill="#F14895" class="lv"/><circle class="cubeSatellite" r="2.6"><animateMotion dur="4s" repeatCount="indefinite" path="M90 44 A46 14 0 1 1 -2 44 A46 14 0 1 1 90 44"/></circle>`;
  }

  return h + x;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBriefing }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tmRef = useRef<HTMLDivElement>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Scroll and progress tracking
  useEffect(() => {
    const tm = tmRef.current;
    const sec = sectionRef.current;
    if (!tm || !sec) return;

    const RM = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const stElements = tm.querySelectorAll<HTMLLIElement>(`.${styles.st}`);

    const upd = () => {
      const r = tm.getBoundingClientRect();
      const m = window.matchMedia('(max-width:900px)').matches;
      const h = m ? r.height : window.innerHeight * 0.5;
      const p = RM ? 1 : Math.min(Math.max((window.innerHeight * 0.78 - r.top) / h, 0), 1);
      tm.style.setProperty('--p', String(p));

      let c = -1;
      stElements.forEach((e, i) => {
        const on = (p >= i / 3 - 0.001 && p > 0.001) || RM;
        e.classList.toggle(styles.on, on);
        if (on) c = i;
      });

      stElements.forEach((e, i) => {
        e.classList.toggle(styles.cur, i === c);
        e.classList.toggle(styles.lk, i < c);
      });

      if (c >= 0) {
        setCurrentStepIdx(c);
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

  // Canvas particle simulation
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
    let PA: Particle[] = [];
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
        cx = W * 0.95;
        cy = H * 0.02;
        R = W * 0.55;
      } else {
        cx = W * 0.97;
        cy = H * 0.1;
        R = W * 0.26;
      }
      bw = R * 0.17;
      const n = W < 700 ? 900 : 1900;
      PA = [];
      for (let i = 0; i < n; i++) {
        PA.push({
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

    // Scroll reveal
    const rvObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            rvObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const rvElements = sec.querySelectorAll(`.${styles.rv}`);
    rvElements.forEach((el) => rvObserver.observe(el));

    window.addEventListener('resize', init);
    init();

    if (!RM) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      sec.removeEventListener('pointermove', onPointerMove);
      sec.removeEventListener('pointerleave', onPointerLeave);
      visObserver.disconnect();
      rvObserver.disconnect();
      window.removeEventListener('resize', init);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStartClick = (e: React.MouseEvent) => {
    if (onOpenBriefing) {
      e.preventDefault();
      onOpenBriefing();
    }
  };

  return (
    <section ref={sectionRef} className={styles.pr} id="processo" aria-labelledby="pt-proc">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.w}>
        <div className={styles.hd}>
          <div>
            <i className={`${styles.bar} ${styles.rv}`}></i>
            <h2 id="pt-proc" className={`${styles.title} ${styles.rv}`}>
              Do primeiro papo ao site no ar
            </h2>
            <p className={`${styles.sub} ${styles.rv}`}>
              Um processo curto, com você acompanhando cada etapa.
            </p>
          </div>
          <div className={`${styles.ix} ${styles.rv}`} aria-hidden="true">
            <span>
              Etapa <i>0{currentStepIdx + 1}</i> / 04
            </span>
            <b>{STEP_NAMES[currentStepIdx]}</b>
          </div>
        </div>

        <div ref={tmRef} className={styles.tm} id="tm">
          <div className={styles.ln} aria-hidden="true">
            <i></i>
            <b></b>
          </div>
          <ol className={styles.ol}>
            {STEPS_DATA.map((step, idx) => (
              <li key={idx} className={`${styles.st} ${styles.rv}`} data-s={idx}>
                <svg
                  className={styles.cb}
                  viewBox="0 0 88 88"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: generateCubeSvg(idx) }}
                />
                <div className={styles.tx}>
                  <div className={styles.no}>{step.no}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.ds}>{step.desc}</p>
                  <div className={styles.rl}>
                    <div className={styles.y}>
                      <b>VOCÊ</b>
                      <span>{step.you}</span>
                    </div>
                    <div>
                      <b>NÓS</b>
                      <span>{step.we}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={`${styles.ft} ${styles.rv}`}>
          <span>
            <i></i>Você aprova o visual antes de qualquer linha de código.
          </span>
          <a className={styles.go} href="#briefing" onClick={handleStartClick}>
            Começar pela conversa
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

