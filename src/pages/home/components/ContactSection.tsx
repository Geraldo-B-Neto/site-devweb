import React, { useEffect, useRef } from 'react';
import styles from './ContactSection.module.css';

interface ContactSectionProps {
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

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBriefing }) => {
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
    const LB = ['Landing page', 'Site', 'Sistema'];

    function g() {
      return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    }

    function init() {
      if (!cv || !ctx) return;
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = W / 2;
      cy = H * (W < 900 ? 0.46 : 0.52);
      R = W < 900 ? Math.min(H * 0.34, W * 0.3) : Math.min(H * 0.36, W * 0.21);
      bw = R * 0.2;

      const n = W < 700 ? 1500 : 2800;
      P = [];
      for (let i = 0; i < n; i++) {
        P.push({
          a: Math.random() * 6.2832,
          d: g() * bw,
          s: Math.random() < 0.2 ? 1.7 : 1,
          sp: (0.00006 + Math.random() * 0.0002) * (Math.random() < 0.5 ? -1 : 1),
          al: 0.25 + Math.random() * 0.75,
          p: Math.random() < 0.14,
          ox: 0,
          oy: 0,
        });
      }
      if (RM) draw(t0);
    }

    function cube(x: number, y: number, s: number, gl: string) {
      if (!ctx) return;
      const w = s * 0.87;
      const h = s * 0.5;
      const T: [number, number] = [x, y - s];
      const UR: [number, number] = [x + w, y - h];
      const LR: [number, number] = [x + w, y + h];
      const B: [number, number] = [x, y + s];
      const LL: [number, number] = [x - w, y + h];
      const UL: [number, number] = [x - w, y - h];
      const C: [number, number] = [x, y];

      function f(a: [number, number][]) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(a[0][0], a[0][1]);
        for (let i = 1; i < a.length; i++) ctx.lineTo(a[i][0], a[i][1]);
        ctx.closePath();
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.save();
      ctx.shadowColor = gl;
      ctx.shadowBlur = s * 0.5;
      ctx.lineJoin = 'round';
      const gr = ctx.createLinearGradient(x, y - s, x, y);
      if (isDark) {
        gr.addColorStop(0, 'rgba(255,255,255,.7)');
        gr.addColorStop(1, 'rgba(255,255,255,.06)');
      } else {
        gr.addColorStop(0, 'rgba(17,19,24,.18)');
        gr.addColorStop(1, 'rgba(17,19,24,.03)');
      }
      f([T, UR, C, UL]);
      ctx.fillStyle = gr;
      ctx.fill();
      f([UL, C, B, LL]);
      ctx.fillStyle = isDark ? 'rgba(5,5,6,.92)' : 'rgba(235,238,245,.95)';
      ctx.fill();
      f([UR, LR, B, C]);
      ctx.fillStyle = isDark ? 'rgba(5,5,6,.92)' : 'rgba(235,238,245,.95)';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isDark ? '#fff' : '#111318';
      ctx.lineWidth = Math.max(1.5, s * 0.04);
      f([T, UR, LR, B, LL, UL]);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(UL[0], UL[1]);
      ctx.lineTo(C[0], C[1]);
      ctx.lineTo(UR[0], UR[1]);
      ctx.moveTo(C[0], C[1]);
      ctx.lineTo(B[0], B[1]);
      ctx.stroke();
      ctx.restore();
    }

    function draw(t: number) {
      if (!ctx) return;
      const s = (t - t0) / 1000;
      const dt = Math.min(t - last, 50);
      last = t;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const baseParticle = isDark ? '#fff' : '#111318';

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

      const ss = R * 0.24;
      const sc = R * 0.2;
      const lx = cx - R;
      const rx = cx + R;
      const fl = (ph: number) => (RM ? 0 : Math.sin(s * 1.2 + ph) * R * 0.015);

      const yl = cy + fl(0);
      const yc = cy + fl(1.6);
      const yr = cy + fl(3.2);
      const ln = [
        [lx + ss * 0.87 + 6, yl, cx - sc * 0.87 - 6, yc],
        [cx + sc * 0.87 + 6, yc, rx - ss * 0.87 - 6, yr],
      ];

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,.5)' : 'rgba(17,19,24,.35)';
      ln.forEach((l, i) => {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(l[0], l[1]);
        ctx.lineTo(l[2], l[3]);
        ctx.stroke();
        const u = (s * 0.35 + i * 0.5) % 1;
        const px = l[0] + (l[2] - l[0]) * u;
        const py = l[1] + (l[3] - l[1]) * u;
        ctx.save();
        ctx.shadowColor = '#F14895';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#F14895';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, 6.2832);
        ctx.fill();
        ctx.restore();
      });

      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,.28)' : 'rgba(17,19,24,.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, yc, sc * 1.55, sc * 0.55, 0, 0, 6.2832);
      ctx.stroke();
      ctx.restore();

      for (let j = 0; j < 2; j++) {
        const an = s * 1.1 + j * Math.PI;
        ctx.fillStyle = isDark ? '#fff' : '#111318';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(an) * sc * 1.55, yc + Math.sin(an) * sc * 0.55, 2.4, 0, 6.2832);
        ctx.fill();
      }

      cube(lx, yl, ss, isDark ? 'rgba(255,255,255,.7)' : 'rgba(17,19,24,.3)');
      cube(cx, yc, sc, 'rgba(241,72,149,.9)');
      cube(rx, yr, ss, isDark ? 'rgba(255,255,255,.7)' : 'rgba(17,19,24,.3)');

      ctx.font = `500 ${Math.max(10, Math.min(13, R * 0.055))}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.fillStyle = isDark ? 'rgba(255,255,255,.72)' : 'rgba(17,19,24,.75)';
      if ('letterSpacing' in ctx) {
        (ctx as unknown as { letterSpacing: string }).letterSpacing = '1.5px';
      }

      [
        [lx, yl, ss],
        [cx, yc, sc],
        [rx, yr, ss],
      ].forEach((c, i) => {
        if (!ctx) return;
        ctx.fillText(LB[i].toUpperCase(), c[0], c[1] + c[2] + R * 0.13);
      });
    }

    function loop(t: number) {
      if (vis) draw(t);
      rafId = requestAnimationFrame(loop);
    }

    const onPointerMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
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

    // Scroll reveal observer
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
    } else if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => draw(t0));
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

  const handleBriefingClick = (e: React.MouseEvent) => {
    if (onOpenBriefing) {
      e.preventDefault();
      onOpenBriefing();
    }
  };

  return (
    <section ref={sectionRef} className={styles.cta} id="contato" aria-labelledby="ctt">
      <div className={styles.tl}>
        <h2 id="ctt" className={styles.title}>
          Vamos colocar o seu negócio no ar?
        </h2>
        <p className={styles.sub}>
          Landing pages<i>/</i>Sites institucionais<i>/</i>Sistemas web
        </p>
      </div>

      <div className={styles.mid}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Anel de partículas com três cubos conectados, representando landing pages, sites institucionais e sistemas web"
        />
      </div>

      <div className={styles.rt}>
        <p>Conte o que você precisa em uma conversa rápida. Respondemos com um plano e um prazo.</p>
        <div className={styles.ac}>
          <a className={styles.bt} href="#briefing" onClick={handleBriefingClick}>
            Montar meu projeto no briefing
          </a>
          <a className={`${styles.bt} ${styles.g}`} href="mailto:contato@devweb.com.br">
            Falar por e-mail
          </a>
        </div>
      </div>

      <p className={styles.big}>
        <span>Entender.</span>
        <span>Desenhar.</span>
        <span>Publicar.</span>
      </p>
    </section>
  );
};

export default ContactSection;
