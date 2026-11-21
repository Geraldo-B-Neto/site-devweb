import React, { useEffect, useRef } from 'react';
import styles from './ManifestoSection.module.css';

const MANIFESTO_TEXT = 'Muito além de um cartão de visitas online: criamos sites inteligentes para empresas que buscam crescimento.';

export const ManifestoSection: React.FC = () => {
  const secRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  // Split text into words
  const words = MANIFESTO_TEXT.split(' ');

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = charsRef.current;
    const N = chars.length;
    const OV = 8;

    if (rm) {
      chars.forEach((c) => {
        if (c) {
          c.style.opacity = '1';
          c.style.transform = 'none';
        }
      });
      return;
    }

    let ticking = false;

    const upd = () => {
      ticking = false;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const L = vh * 0.35;
      const tot = r.height - vh + L;
      const pr = Math.min(1, Math.max(0, (L - r.top) / tot));
      const q = Math.min(1, pr / 0.85);
      const pos = q * (N + OV);

      for (let i = 0; i < N; i++) {
        const c = chars[i];
        if (!c) continue;
        const f = Math.min(1, Math.max(0, (pos - i) / OV));
        c.style.transform = `translateY(${((1 - f) * 118).toFixed(1)}%)`;
        c.style.opacity = f.toFixed(2);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(upd);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    upd();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Reset charsRef on each render so we don't accumulate duplicates
  charsRef.current = [];

  return (
    <section className={`${styles.tsplit} ${styles.on}`} id="manifesto" ref={secRef}>
      <div className={styles.tsIn}>
        <p className={styles.tsP}>
          <span className={styles.sr}>{MANIFESTO_TEXT}</span>
          <span className={styles.tsVis} aria-hidden="true">
            {words.map((w, wi) => (
              <React.Fragment key={wi}>
                <span className={styles.w}>
                  {w.split('').map((ch, ci) => (
                    <span key={ci} className={styles.cw}>
                      <span
                        ref={(el) => {
                          if (el) charsRef.current.push(el);
                        }}
                        className={styles.ci}
                      >
                        {ch}
                      </span>
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </span>
        </p>
      </div>
    </section>
  );
};

export default ManifestoSection;
