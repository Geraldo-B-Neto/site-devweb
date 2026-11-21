import React, { useState } from 'react';
import styles from '../styles.module.css';

export interface SimulatorPrefill {
  segment: string;
  features: string[];
}

interface SimulatorSectionProps {
  onMountProject?: (prefill: SimulatorPrefill) => void;
}

type SegmentKey = 'barbearia' | 'restaurante' | 'clinica';

interface SegmentData {
  label: string;
  nome: string;
  accent: string;
  tag: string;
  cta: string;
  items: [string, string][];
}

const SEGMENTS: Record<SegmentKey, SegmentData> = {
  barbearia: {
    label: 'Barbearia',
    nome: 'Barbearia Alinha',
    accent: '#E5252A',
    tag: 'Corte e barba no centro da cidade',
    cta: 'Quero meu horário',
    items: [
      ['Corte', 'R$ 45'],
      ['Barba', 'R$ 35'],
      ['Corte + barba', 'R$ 70'],
    ],
  },
  restaurante: {
    label: 'Restaurante',
    nome: 'Cantina do Zé',
    accent: '#0B8A4F',
    tag: 'Comida caseira, do jeito da casa',
    cta: 'Ver cardápio e pedir',
    items: [
      ['Parmegiana', 'R$ 42'],
      ['Risoto de cogumelos', 'R$ 48'],
      ['Tiramisù', 'R$ 22'],
    ],
  },
  clinica: {
    label: 'Clínica',
    nome: 'Clínica Bem Viver',
    accent: '#2563EB',
    tag: 'Cuidado com a sua saúde',
    cta: 'Falar com a clínica',
    items: [
      ['Clínico geral', 'R$ 180'],
      ['Nutrição', 'R$ 150'],
      ['Psicologia', 'R$ 140'],
    ],
  },
};

const FEATURE_NAMES: Record<string, string> = {
  wa: 'Botão de WhatsApp',
  rev: 'Avaliações de clientes',
  pix: 'Formulário de contato',
};

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({ onMountProject }) => {
  const [segment, setSegment] = useState<SegmentKey>('barbearia');
  const [features, setFeatures] = useState<Record<string, boolean>>({ wa: true, rev: false, pix: false });

  const currentSeg = SEGMENTS[segment];
  const activeFeatures = Object.keys(features).filter((k) => features[k]);

  const toggleFeature = (key: string) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMount = (e: React.MouseEvent) => {
    if (onMountProject) {
      e.preventDefault();
      onMountProject({
        segment: currentSeg.label,
        features: activeFeatures.map((f) => FEATURE_NAMES[f]),
      });
    }
  };

  const deliveryDays = 5 + 2 * activeFeatures.length;

  return (
    <section id="simulador" className={styles.sim}>
      <div className={`wrap ${styles.simWrap}`}>
        <div>
          <h2>Veja o seu negócio no ar antes de começar</h2>
          <p style={{ margin: '16px 0 0', maxWidth: '32em' }}>
            Escolha o seu segmento e os recursos que quer ter. O celular ao lado mostra como o seu site poderia ficar.
          </p>

          <div className={styles.ctl}>
            <h3 id="l-seg">Qual o seu negócio?</h3>
            <div className={styles.chips} role="tablist" aria-labelledby="l-seg">
              {(Object.keys(SEGMENTS) as SegmentKey[]).map((key) => (
                <button
                  key={key}
                  className={styles.chip}
                  role="tab"
                  aria-selected={segment === key}
                  onClick={() => setSegment(key)}
                >
                  {SEGMENTS[key].label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.ctl}>
            <h3>O que você quer ter?</h3>
            <div className={styles.chips}>
              <button
                className={styles.chip}
                aria-pressed={features.wa}
                onClick={() => toggleFeature('wa')}
              >
                Botão de WhatsApp
              </button>
              <button
                className={styles.chip}
                aria-pressed={features.rev}
                onClick={() => toggleFeature('rev')}
              >
                Avaliações de clientes
              </button>
              <button
                className={styles.chip}
                aria-pressed={features.pix}
                onClick={() => toggleFeature('pix')}
              >
                Formulário de contato
              </button>
            </div>
          </div>

          <div className={styles.est} aria-live="polite">
            Pré-visualização: {currentSeg.nome}
            {activeFeatures.length > 0 &&
              ` com ${activeFeatures.map((f) => FEATURE_NAMES[f].toLowerCase()).join(', ')}`}
            .<br />
            Prazo de referência: <b>{deliveryDays} dias úteis</b>
            <small>Valor ilustrativo. O prazo real é combinado na conversa.</small>
          </div>

          <a className="btn btn-primary" href="#briefing" onClick={handleMount}>
            Montar meu projeto no briefing
          </a>
        </div>

        {/* Live Phone Mockup */}
        <div className={styles.phone} aria-hidden="true">
          <div className={styles.ph} style={{ ['--ac' as string]: currentSeg.accent }}>
            <div className={styles.phTop}>
              <b>{currentSeg.nome}</b>
              <span>{currentSeg.tag}</span>
            </div>
            <div className={styles.phB}>
              {currentSeg.items.map(([name, price], idx) => (
                <div key={idx} className={styles.row}>
                  <span>{name}</span>
                  <b>{price}</b>
                </div>
              ))}
              <button type="button" className={styles.phCta} tabIndex={-1}>
                {currentSeg.cta}
              </button>
            </div>

            {features.rev && (
              <div className={styles.blk}>
                <b>★ 4,9</b> · 128 avaliações de clientes
              </div>
            )}
            {features.pix && (
              <div className={styles.blk}>
                Deixe seu contato e retornamos em minutos
              </div>
            )}
            {features.wa && (
              <div className={styles.waBtn}>
                Fale no WhatsApp
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
