import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './FaqSection.module.css';

interface FaqSectionProps {
  onOpenBriefing?: () => void;
}

interface QAItem {
  q: string;
  a: string;
}

const QA: QAItem[] = [
  {
    q: 'Quanto tempo leva para ficar pronto?',
    a: 'Uma <b>landing page</b> costuma ficar pronta em poucos dias. Sites institucionais e sistemas levam mais, conforme o tamanho do projeto. O prazo exato é combinado na conversa, antes de começar.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não. Você conta o que o seu negócio precisa e a gente cuida do resto, do desenho ao código e à publicação. <b>Você só aprova o visual</b> antes de qualquer linha de código.',
  },
  {
    q: 'Posso pedir mudanças depois que o site estiver no ar?',
    a: 'Pode. Depois da entrega a gente fica por perto para <b>ajustes e evolução</b>, com suporte e planos para crescer. Se preferir, você também pode ter autonomia para atualizar textos e fotos sem depender de ninguém.',
  },
  {
    q: 'Qual a diferença entre landing page e site institucional?',
    a: '<b>Landing page</b> é uma página única, focada em uma oferta e feita para o visitante entrar em contato. <b>Site institucional</b> tem várias páginas e apresenta a empresa, os serviços e a história, passando mais credibilidade.',
  },
  {
    q: 'Quanto custa?',
    a: 'Os projetos começam <b>a partir de R$ 690</b>. O orçamento final é combinado na conversa, antes de começar, sem surpresa depois.',
  },
];

function formatWords(h: string): string {
  let i = 0;
  return h
    .replace(/(<b>)(.*?)(<\/b>)|([^<\s]+)/g, (_m, a, b, _c, d) => {
      if (a) {
        return (
          '<b>' +
          b
            .split(' ')
            .map((w: string) => `<span class="wd" style="--i:${i++}">${w}</span>`)
            .join(' ') +
          '</b>'
        );
      }
      return `<span class="wd" style="--i:${i++}">${d}</span>`;
    })
    .replace(/<\/span><span/g, '</span> <span');
}

const P: [number, number][] = [
  [50, 252],
  [122, 214],
  [194, 176],
  [266, 138],
  [338, 100],
];
const D_PATH = 'M' + P.map((p) => p.join(',')).join(' L');
const CUBES_RENDER_ORDER = [4, 3, 2, 1, 0];

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBriefing }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isTalking, setIsTalking] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const talkTimerRef = useRef<number | null>(null);

  const formattedAnswers = useMemo(() => QA.map((item) => formatWords(item.a)), []);

  const openItem = (idx: number, nextOpenState: boolean) => {
    setActiveIdx((prev) => {
      const willBeOpen = nextOpenState ? idx : prev === idx ? null : idx;
      if (willBeOpen !== null) {
        setIsTalking(true);
        if (talkTimerRef.current) clearTimeout(talkTimerRef.current);
        const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        talkTimerRef.current = window.setTimeout(
          () => {
            setIsTalking(false);
          },
          rm ? 0 : 1900
        );
      } else {
        setIsTalking(false);
      }
      return willBeOpen;
    });
  };

  const toggle = (idx: number) => {
    openItem(idx, activeIdx !== idx);
  };

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      openItem(0, true);
      return;
    }

    let autoOpened = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (!autoOpened) {
              autoOpened = true;
              setTimeout(() => {
                openItem(0, true);
              }, 500);
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(sec);

    return () => {
      io.disconnect();
      if (talkTimerRef.current) clearTimeout(talkTimerRef.current);
    };
  }, []);

  return (
    <section
      className={`${styles.fq} ${isTalking ? styles.talk : ''}`}
      id="duvidas"
      aria-labelledby="ft"
      ref={sectionRef}
    >
      <span id="faq" style={{ position: 'absolute', top: 0, pointerEvents: 'none' }} />
      <div className={styles.w}>
        <div className={styles.l}>
          <i className={`${styles.bar} ${styles.rv} ${isRevealed ? styles.in : ''}`} />
          <h2 id="ft" className={`${styles.title} ${styles.rv} ${isRevealed ? styles.in : ''}`}>
            Dúvidas frequentes
          </h2>
          <p className={`${styles.sub} ${styles.rv} ${isRevealed ? styles.in : ''}`}>
            Escolha uma pergunta e a gente responde.
          </p>

          <div className={`${styles.stg} ${styles.rv} ${isRevealed ? styles.in : ''}`}>
            <svg
              className={styles.tw}
              id="tw"
              viewBox="0 0 400 340"
              aria-hidden="true"
              style={
                {
                  '--pg': activeIdx !== null ? activeIdx * 25 : 0,
                } as React.CSSProperties
              }
            >
              <path className={`${styles.lk} ${styles.lkB}`} d={D_PATH} />
              <path
                className={`${styles.lk} ${styles.lkP}`}
                pathLength="100"
                d={D_PATH}
              />
              {CUBES_RENDER_ORDER.map((k) => (
                <g
                  key={k}
                  className={`${styles.bk} ${activeIdx === k ? styles.on : ''}`}
                  data-k={k}
                  style={{ '--k': k } as React.CSSProperties}
                  onClick={() => toggle(k)}
                >
                  <use
                    href="#cb2-faq"
                    transform={`translate(${P[k][0] - 42},${P[k][1] - 42}) scale(.95)`}
                  />
                </g>
              ))}
              {P.map((p, k) => (
                <text
                  key={k}
                  className={`${styles.lb} ${activeIdx === k ? styles.on : ''}`}
                  x={p[0]}
                  y={p[1] + 54}
                  onClick={() => toggle(k)}
                >
                  0{k + 1}
                </text>
              ))}
            </svg>
            <div className={styles.cap} aria-live="polite">
              {activeIdx !== null ? (
                <>
                  Pergunta <b>0{activeIdx + 1}</b> / 05
                </>
              ) : (
                'Escolha uma pergunta'
              )}
            </div>
          </div>

          <div className={`${styles.cta} ${styles.rv} ${isRevealed ? styles.in : ''}`}>
            <p>Ficou com outra dúvida? Conte o seu caso, a gente responde sem enrolação.</p>
            <a
              className={styles.bt}
              href="#briefing"
              onClick={(e) => {
                if (onOpenBriefing) {
                  e.preventDefault();
                  onOpenBriefing();
                }
              }}
            >
              Falar com a DevWeb
            </a>
          </div>
        </div>

        <ol className={styles.list} id="list">
          {QA.map((item, i) => {
            const isOpen = activeIdx === i;
            const n = '0' + (i + 1);
            return (
              <li
                key={i}
                className={`${styles.it} ${styles.rv} ${isRevealed ? styles.in : ''} ${isOpen ? styles.on : ''}`}
              >
                <h3>
                  <button
                    className={styles.q}
                    type="button"
                    id={`q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`a${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span className={styles.n}>{n}</span>
                    <span className={styles.t}>{item.q}</span>
                    <svg className={styles.ic} viewBox="0 0 88 88" aria-hidden="true">
                      <use href="#cb2-faq" />
                    </svg>
                  </button>
                </h3>
                <div
                  className={styles.an}
                  id={`a${i}`}
                  role="region"
                  aria-labelledby={`q${i}`}
                >
                  <div className={styles.in}>
                    <div className={styles.rp}>
                      <div className={styles.av} aria-hidden="true">
                        <svg viewBox="0 0 88 88">
                          <use href="#cb2-faq" />
                        </svg>
                      </div>
                      <div className={styles.bb}>
                        <span className={styles.ty} aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: formattedAnswers[i] }} />
                      </div>
                    </div>
                  </div>
                </div>
                <i className={styles.pl} />
              </li>
            );
          })}
        </ol>
      </div>

      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <linearGradient id="lg-faq" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#F14895" />
            <stop offset="1" stopColor="#E82824" />
          </linearGradient>
          <linearGradient id="tg-faq" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--cube-top-1)" stopOpacity="var(--cube-top-op1)" />
            <stop offset="1" stopColor="var(--cube-top-1)" stopOpacity="var(--cube-top-op2)" />
          </linearGradient>
          <g id="cb2-faq" stroke="var(--cube-stroke)" strokeWidth="1.6" strokeLinejoin="round" fill="none">
            <polygon points="44,10 73,27 44,44 15,27" fill="url(#tg-faq)" />
            <polygon points="15,27 44,44 44,78 15,61" fill="var(--cube-fill)" />
            <polygon points="73,27 44,44 44,78 73,61" fill="var(--cube-fill)" />
            <polygon points="44,10 73,27 73,61 44,78 15,61 15,27" />
          </g>
        </defs>
      </svg>
    </section>
  );
};

export default FaqSection;
