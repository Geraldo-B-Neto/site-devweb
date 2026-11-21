import React, { useState } from 'react';
import styles from './BriefingSection.module.css';
import { SimulatorPrefill } from './SimulatorSection';

import cromaticaImg from '../../../assets/images/cromatica-desktop.webp';
import cervoImg from '../../../assets/images/cervo-desktop.webp';
import institucionalImg from '../../../assets/images/servico-institucional.webp';

interface BriefingSectionProps {
  onClose: () => void;
  prefillData?: SimulatorPrefill | null;
}

interface OptionItem {
  id: string;
  icon: string;
  label: string;
  desc: string;
}

interface RecommendedSite {
  name: string;
  category: string;
  image: string;
  badge: string;
  description: string;
  features: string[];
}

export const BriefingSection: React.FC<BriefingSectionProps> = ({ onClose, prefillData }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Form states
  const [segment, setSegment] = useState(prefillData?.segment || '');
  const [goal, setGoal] = useState('');
  const [stage, setStage] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [features, setFeatures] = useState<string[]>(prefillData?.features || []);
  const [contact, setContact] = useState({
    name: '',
    whatsapp: '',
    email: '',
  });

  // Steps configuration (Without displaying question count to user)
  const TOTAL_STEPS = 6;
  const progressPercent = Math.min(((currentStep + 1) / TOTAL_STEPS) * 100, 100);

  // Options Definitions
  const segmentOptions: OptionItem[] = [
    {
      id: 'comercio',
      icon: '🛍️',
      label: 'Comércio & Varejo',
      desc: 'Lojas físicas, comércio local e vendas de produtos.',
    },
    {
      id: 'servicos',
      icon: '💼',
      label: 'Serviços & Consultoria',
      desc: 'Advocacia, engenharia, consultores e prestadores de serviço.',
    },
    {
      id: 'saude',
      icon: '🩺',
      label: 'Saúde & Bem-Estar',
      desc: 'Clínicas médicas, odontológicas, estética e psicologia.',
    },
    {
      id: 'gastronomia',
      icon: '☕',
      label: 'Gastronomia & Eventos',
      desc: 'Restaurantes, cafés, bistrôs, bares e espaços de eventos.',
    },
    {
      id: 'agro',
      icon: '🌱',
      label: 'Agronegócio & Indústria',
      desc: 'Produtores rurais, máquinas, insumos e cooperativas.',
    },
    {
      id: 'tech',
      icon: '⚡',
      label: 'Tecnologia & Startups',
      desc: 'Softwares, plataformas digitais e novos modelos de negócio.',
    },
  ];

  const goalOptions: OptionItem[] = [
    {
      id: 'whatsapp',
      icon: '💬',
      label: 'Gerar orçamentos e contatos diretos no WhatsApp',
      desc: 'Foco total em conversão e captação imediata de potenciais clientes.',
    },
    {
      id: 'autoridade',
      icon: '🏆',
      label: 'Apresentar a empresa com máxima credibilidade',
      desc: 'Posicionamento institucional sólido para fechar contratos de maior valor.',
    },
    {
      id: 'google',
      icon: '🔍',
      label: 'Ser encontrado nas buscas do Google (SEO Local)',
      desc: 'Estrutura técnica otimizada para atrair clientes orgânicos na sua região.',
    },
    {
      id: 'sistema',
      icon: '⚙️',
      label: 'Automatizar rotinas, agendamentos ou cadastros',
      desc: 'Um sistema que roda no navegador e organiza o fluxo da sua empresa.',
    },
  ];

  const stageOptions: OptionItem[] = [
    {
      id: 'zero',
      icon: '🚀',
      label: 'Negócio em fase de lançamento',
      desc: 'Começando do zero e buscando criar a primeira presença profissional.',
    },
    {
      id: 'melhoria',
      icon: '📈',
      label: 'Já tenho clientes, mas não tenho site ou o atual é fraco',
      desc: 'Preciso de um site rápido, bonito e que realmente funcione no celular.',
    },
    {
      id: 'consolidado',
      icon: '🏛️',
      label: 'Empresa consolidada buscando modernizar e liderar',
      desc: 'Quero tecnologia sob medida e design autoral que supere a concorrência.',
    },
  ];

  const styleOptions: OptionItem[] = [
    {
      id: 'minimalista',
      icon: '✨',
      label: 'Minimalista, elegante e sofisticado',
      desc: 'Tipografia refinada, espaço generoso e ar premium.',
    },
    {
      id: 'tech',
      icon: '⚡',
      label: 'Tecnológico, moderno e dinâmico',
      desc: 'Elementos interativos, contraste marcante e sensação de inovação.',
    },
    {
      id: 'corporativo',
      icon: '🏛️',
      label: 'Corporativo, sólido e institucional',
      desc: 'Clube de negócios, confiança imediata e clareza absoluta.',
    },
    {
      id: 'autoral',
      icon: '🎨',
      label: 'Autoral, expressivo e acolhedor',
      desc: 'Destaque para fotos reais, identidade própria e proximidade humana.',
    },
  ];

  const featureOptions: OptionItem[] = [
    {
      id: 'whats_inteligente',
      icon: '🟢',
      label: 'Botão WhatsApp com mensagem pré-configurada',
      desc: 'O visitante já inicia a conversa com o assunto definido.',
    },
    {
      id: 'speed_ads',
      icon: '⚡',
      label: 'Carregamento ultra-rápido (< 1s) para anúncios',
      desc: 'Não perde cliques de campanhas no Instagram ou Google Ads.',
    },
    {
      id: 'catalogo',
      icon: '📑',
      label: 'Catálogo dinâmico de produtos ou serviços',
      desc: 'Apresentação detalhada do portfólio de forma interativa.',
    },
    {
      id: 'agendamento',
      icon: '📅',
      label: 'Sistema de agendamento online integrado',
      desc: 'Clientes escolhem data e horário sem troca infinita de mensagens.',
    },
    {
      id: 'seo_local',
      icon: '📍',
      label: 'Otimização para busca local no Google (Patrocínio & Região)',
      desc: 'Estruturação de dados para aparecer nos mapas e buscas.',
    },
    {
      id: 'painel_facil',
      icon: '✏️',
      label: 'Painel simples para você atualizar fotos e textos',
      desc: 'Independência total para ajustes sem precisar de desenvolvedor.',
    },
  ];

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Recommendation Generator based on answers
  const generateJustification = () => {
    const selectedSeg = segment || 'o seu segmento';
    const selectedGoal = goal || 'gerar mais contatos e credibilidade';

    return (
      <>
        Analisamos as suas escolhas para <strong>{selectedSeg}</strong> com foco em{' '}
        <strong>{selectedGoal.toLowerCase()}</strong>. Identificamos que o seu negócio
        precisa de uma solução com <strong>código sob medida</strong>, carregamento instantâneo
        no celular e uma arquitetura que elimina atritos até o fechamento. Em nossos projetos
        reais, essa exata combinação gerou resultados mensuráveis logo nas primeiras semanas.
      </>
    );
  };

  const recommendedSites: RecommendedSite[] = [
    {
      name: 'Cromática Filmes & Educação',
      category: 'Página de Apresentação & Conversão',
      image: cromaticaImg,
      badge: 'Case de Conversão',
      description:
        'A maior escola de música de Patrocínio precisava de presença autoral e fluxo claro para captação de alunos no WhatsApp.',
      features: [
        'Carregamento em 0.8s no celular',
        'Caminho direto para matrícula e contato',
        'Identidade visual autoral e impactante',
      ],
    },
    {
      name: 'Cervo Café & Bistrô',
      category: 'Identidade & Experiência Mobile',
      image: cervoImg,
      badge: 'Case Gastronomia',
      description:
        'Experiência pensada 100% para o smartphone, com cardápio dinâmico, localização integrada e fotografia que valoriza o produto.',
      features: [
        'Navegação fluida sem travamentos',
        'Cardápio interativo e atualizável',
        'Aumento direto no fluxo de clientes locais',
      ],
    },
    {
      name: 'Plataforma Web Institucional',
      category: 'Estrutura Completa & SEO',
      image: institucionalImg,
      badge: 'Case Institucional',
      description:
        'Estrutura com múltiplas páginas para empresas que precisam de autoridade em licitações, parcerias e buscas no Google.',
      features: [
        'Aparece nas primeiras posições de busca',
        'Certificação de segurança e código limpo',
        'Painel intuitivo de atualização',
      ],
    },
  ];

  const handleSendWhatsApp = () => {
    const summary = [
      `*Briefing DevWeb - Solicitação de Projeto*`,
      `*Nome:* ${contact.name || 'Cliente'}`,
      `*WhatsApp:* ${contact.whatsapp || 'Não informado'}`,
      `*E-mail:* ${contact.email || 'Não informado'}`,
      `*Segmento:* ${segment || 'Geral'}`,
      `*Objetivo Principal:* ${goal || 'Mais clientes'}`,
      `*Momento do Negócio:* ${stage || 'Em desenvolvimento'}`,
      `*Estilo Visual:* ${stylePreference || 'Personalizado'}`,
      `*Recursos Desejados:* ${features.join(', ') || 'A definir'}`,
    ].join('\n');

    const url = `https://wa.me/5534998418664?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank');
  };

  return (
    <section className={styles.briefingOverlay} id="briefing">
      <div className={styles.gridFrame}>
        {/* Top Header */}
        <header className={styles.topNav}>
          <div className={styles.brandWrap}>
            <span className={styles.brandLogo}>DevWeb</span>
            <span className={styles.brandBadge}>Briefing Dinâmico</span>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            title="Voltar ao site"
          >
            ✕ Fechar
          </button>
        </header>

        {/* Continuous Progress Bar (WITHOUT question count) */}
        {currentStep < TOTAL_STEPS && (
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className={styles.contentArea}>
          {/* Subtle Topographic Background vector */}
          <svg
            className={styles.topoBg}
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0,100 C150,40 300,160 450,120 C520,100 580,70 600,80"
              stroke="#2E382E"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
            <path
              d="M0,160 C120,110 280,210 420,170 C500,150 560,110 600,120"
              stroke="#2E382E"
              strokeWidth="1.4"
              strokeOpacity="0.4"
            />
            <path
              d="M0,220 C100,170 240,260 400,220 C480,200 550,150 600,160"
              stroke="#2E382E"
              strokeWidth="1.8"
              strokeOpacity="0.5"
            />
            <path
              d="M100,280 C200,220 320,140 420,80"
              stroke="#E8502A"
              strokeWidth="2.4"
              strokeDasharray="10 8"
            />
          </svg>

          {/* STEP 0: Segmento */}
          {currentStep === 0 && (
            <div className={styles.questionView}>
              <span className={styles.questionEyebrow}>Sobre o seu negócio</span>
              <h2 className={styles.questionTitle}>Qual é o seu segmento de atuação?</h2>
              <p className={styles.questionSubtitle}>
                Isso nos ajuda a calibrar a linguagem, o apelo visual e os padrões de navegação da sua área.
              </p>

              <div className={styles.optionsGrid}>
                {segmentOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={`${styles.optionCard} ${segment === opt.label ? styles.selected : ''}`}
                    onClick={() => setSegment(opt.label)}
                  >
                    <div className={styles.optionHeader}>
                      <span className={styles.optionIcon}>{opt.icon}</span>
                      <div className={styles.optionCheck}>
                        {segment === opt.label && (
                          <svg viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className={styles.optionLabel}>{opt.label}</div>
                    <p className={styles.optionDesc}>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className={styles.navActions}>
                <button
                  type="button"
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={!segment}
                >
                  Avançar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: Objetivo Principal */}
          {currentStep === 1 && (
            <div className={styles.questionView}>
              <span className={styles.questionEyebrow}>Foco do projeto</span>
              <h2 className={styles.questionTitle}>Qual é o objetivo principal do seu novo site?</h2>
              <p className={styles.questionSubtitle}>
                Todo projeto de sucesso parte de uma prioridade clara para direcionar o visitante.
              </p>

              <div className={styles.optionsGrid}>
                {goalOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={`${styles.optionCard} ${goal === opt.label ? styles.selected : ''}`}
                    onClick={() => setGoal(opt.label)}
                  >
                    <div className={styles.optionHeader}>
                      <span className={styles.optionIcon}>{opt.icon}</span>
                      <div className={styles.optionCheck}>
                        {goal === opt.label && (
                          <svg viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className={styles.optionLabel}>{opt.label}</div>
                    <p className={styles.optionDesc}>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className={styles.navActions}>
                <button type="button" className={styles.btnBack} onClick={handleBack}>
                  ← Voltar
                </button>
                <button
                  type="button"
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={!goal}
                >
                  Avançar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Momento Atual */}
          {currentStep === 2 && (
            <div className={styles.questionView}>
              <span className={styles.questionEyebrow}>Maturidade da marca</span>
              <h2 className={styles.questionTitle}>Qual momento melhor descreve sua empresa?</h2>
              <p className={styles.questionSubtitle}>
                Avaliamos o escopo ideal para cada fase de crescimento do seu negócio.
              </p>

              <div className={styles.optionsGrid}>
                {stageOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={`${styles.optionCard} ${stage === opt.label ? styles.selected : ''}`}
                    onClick={() => setStage(opt.label)}
                  >
                    <div className={styles.optionHeader}>
                      <span className={styles.optionIcon}>{opt.icon}</span>
                      <div className={styles.optionCheck}>
                        {stage === opt.label && (
                          <svg viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className={styles.optionLabel}>{opt.label}</div>
                    <p className={styles.optionDesc}>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className={styles.navActions}>
                <button type="button" className={styles.btnBack} onClick={handleBack}>
                  ← Voltar
                </button>
                <button
                  type="button"
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={!stage}
                >
                  Avançar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Estilo Visual */}
          {currentStep === 3 && (
            <div className={styles.questionView}>
              <span className={styles.questionEyebrow}>Design & Identidade</span>
              <h2 className={styles.questionTitle}>Qual estilo visual combina com o que você imagina?</h2>
              <p className={styles.questionSubtitle}>
                Nosso design é 100% autoral e sob medida para o posicionamento da sua marca.
              </p>

              <div className={styles.optionsGrid}>
                {styleOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={`${styles.optionCard} ${stylePreference === opt.label ? styles.selected : ''}`}
                    onClick={() => setStylePreference(opt.label)}
                  >
                    <div className={styles.optionHeader}>
                      <span className={styles.optionIcon}>{opt.icon}</span>
                      <div className={styles.optionCheck}>
                        {stylePreference === opt.label && (
                          <svg viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className={styles.optionLabel}>{opt.label}</div>
                    <p className={styles.optionDesc}>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className={styles.navActions}>
                <button type="button" className={styles.btnBack} onClick={handleBack}>
                  ← Voltar
                </button>
                <button
                  type="button"
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={!stylePreference}
                >
                  Avançar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Recursos Desejados (Múltipla Escolha) */}
          {currentStep === 4 && (
            <div className={styles.questionView}>
              <span className={styles.questionEyebrow}>Engenharia & Funcionalidades</span>
              <h2 className={styles.questionTitle}>Quais recursos você considera indispensáveis?</h2>
              <p className={styles.questionSubtitle}>
                Selecione quantos desejar para estruturarmos as integrações técnicas certas.
              </p>

              <div className={styles.optionsGrid}>
                {featureOptions.map((opt) => {
                  const isChecked = features.includes(opt.label);
                  return (
                    <div
                      key={opt.id}
                      className={`${styles.optionCard} ${isChecked ? styles.selected : ''}`}
                      onClick={() => toggleFeature(opt.label)}
                    >
                      <div className={styles.optionHeader}>
                        <span className={styles.optionIcon}>{opt.icon}</span>
                        <div className={styles.optionCheck}>
                          {isChecked && (
                            <svg viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className={styles.optionLabel}>{opt.label}</div>
                      <p className={styles.optionDesc}>{opt.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className={styles.navActions}>
                <button type="button" className={styles.btnBack} onClick={handleBack}>
                  ← Voltar
                </button>
                <button
                  type="button"
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={features.length === 0}
                >
                  Avançar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Contato */}
          {currentStep === 5 && (
            <div className={styles.questionView}>
              <span className={styles.questionEyebrow}>Quase pronto</span>
              <h2 className={styles.questionTitle}>Onde podemos enviar sua recomendação de projeto?</h2>
              <p className={styles.questionSubtitle}>
                Preencha seus dados para visualizar a análise personalizada e os 3 sites recomendados.
              </p>

              <div className={styles.contactForm}>
                <div className={styles.formRow}>
                  <label className={styles.formLabel}>Seu nome ou nome da empresa *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Ex: Ana Silva ou Clínica Sorriso"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <label className={styles.formLabel}>WhatsApp com DDD *</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    placeholder="(34) 99999-9999"
                    value={contact.whatsapp}
                    onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <label className={styles.formLabel}>E-mail profissional</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    placeholder="contato@suaempresa.com.br"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.navActions}>
                <button type="button" className={styles.btnBack} onClick={handleBack}>
                  ← Voltar
                </button>
                <button
                  type="button"
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={!contact.name || !contact.whatsapp}
                >
                  Ver recomendação completa →
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: FINAL RECOMMENDATION ENGINE SCREEN */}
          {currentStep === 6 && (
            <div className={styles.resultsView}>
              <header className={styles.resultsHeader}>
                <span className={styles.resultsEyebrow}>Diagnóstico Concluído</span>
                <h1 className={styles.resultsTitle}>
                  A solução ideal para a presença digital da sua empresa
                </h1>
              </header>

              {/* Justification Box */}
              <div className={styles.justificationCard}>
                <h3 className={styles.justificationTitle}>
                  // Por que essa recomendação resolve o seu problema
                </h3>
                <p className={styles.justificationText}>{generateJustification()}</p>
              </div>

              {/* 3 Recommended Sites Matching User Answers */}
              <h3
                style={{
                  font: '600 20px var(--head, Space Grotesk, sans-serif)',
                  margin: '0 0 20px 0',
                  color: '#111812',
                  letterSpacing: '-0.02em',
                }}
              >
                3 Projetos da DevWeb com arquiteturas semelhantes à sua necessidade:
              </h3>

              <div className={styles.recommendedGrid}>
                {recommendedSites.map((site, idx) => (
                  <article key={idx} className={styles.siteCard}>
                    <div className={styles.siteImageWrap}>
                      <img src={site.image} alt={site.name} className={styles.siteImage} />
                      <span className={styles.siteBadge}>{site.badge}</span>
                    </div>
                    <div className={styles.siteBody}>
                      <h4 className={styles.siteName}>{site.name}</h4>
                      <span className={styles.siteCategory}>{site.category}</span>
                      <p className={styles.siteDescription}>{site.description}</p>
                      <ul className={styles.siteFeatures}>
                        {site.features.map((feat, fIdx) => (
                          <li key={fIdx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              {/* Final Call to Action Block */}
              <div className={styles.ctaBox}>
                <div className={styles.ctaText}>
                  <h3>Vamos tirar o seu projeto do papel com essa estrutura?</h3>
                  <p>
                    Nosso time já recebeu o resumo das suas escolhas. Clique abaixo para iniciar a conversa
                    direto com nossos analistas no WhatsApp ou agendar uma reunião de 30 minutos.
                  </p>
                </div>

                <div className={styles.ctaButtons}>
                  <button
                    type="button"
                    className={styles.btnPrimaryWhatsapp}
                    onClick={handleSendWhatsApp}
                  >
                    <span>💬</span> Iniciar no WhatsApp
                  </button>

                  <button
                    type="button"
                    className={styles.btnSecondaryAction}
                    onClick={handleSendWhatsApp}
                  >
                    Agendar conversa (30 min)
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={styles.btnRestart}
                onClick={() => {
                  setCurrentStep(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ↺ Refazer briefing do início
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BriefingSection;
