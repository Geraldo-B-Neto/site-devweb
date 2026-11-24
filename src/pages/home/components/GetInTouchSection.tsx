import React, { useState } from 'react';
import styles from './GetInTouchSection.module.css';

interface GetInTouchSectionProps {
  onOpenBriefing?: () => void;
}

export const GetInTouchSection: React.FC<GetInTouchSectionProps> = ({ onOpenBriefing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name && !formData.email && !formData.message) return;

    // Build WhatsApp message URL or open briefing
    const text = encodeURIComponent(
      `Olá! Meu nome é ${formData.name || 'Cliente'}${
        formData.email ? ` (${formData.email})` : ''
      }.\nMensagem: ${formData.message || 'Gostaria de solicitar um orçamento.'}`
    );
    window.open(`https://wa.me/5534997315975?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className={styles.getInTouch} id="contato-rapido">
      <div className={styles.wrap}>
        {/* Left Column */}
        <div className={styles.colLeft}>
          <h2 className={styles.title}>FALE COM A DEVWEB</h2>
          <p className={styles.subtitle}>
            Quer criar um site de alto impacto ou acelerar os resultados do seu negócio? Fale com a nossa equipe.
          </p>

          <div className={styles.findUs}>
            <span className={styles.findUsTitle}>ONDE ESTAMOS:</span>
            <div className={styles.badgesRow}>
              <a
                className={styles.badge}
                href="https://wa.me/5534997315975"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.77 2.71 4.29 3.8 2.52 1.09 2.52.73 2.98.69.45-.04 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29" />
                </svg>
                <span>(34) 99731-5975</span>
              </a>

              <a
                className={styles.badge}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>

            <div className={styles.badgesRow}>
              <a
                className={styles.badge}
                href="#briefing"
                onClick={(e) => {
                  if (onOpenBriefing) {
                    e.preventDefault();
                    onOpenBriefing();
                  }
                }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zm0-12H5V6h14m-7 5h5v5h-5z" />
                </svg>
                <span>Agendar conversa de 30 min</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form and Submit Button */}
        <form className={styles.formWrap} onSubmit={handleSubmit}>
          <div className={styles.inputsCol}>
            <div className={styles.inputRow}>
              <input
                type="text"
                name="name"
                placeholder="Digite seu nome ou empresa"
                className={styles.inputField}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className={styles.inputLabel}>Nome</span>
            </div>

            <div className={styles.inputRow}>
              <input
                type="email"
                name="email"
                placeholder="Digite seu melhor e-mail"
                className={styles.inputField}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className={styles.inputLabel}>E-mail</span>
            </div>

            <div className={styles.inputRow}>
              <input
                type="text"
                name="message"
                placeholder="Conte brevemente sobre o seu projeto"
                className={styles.inputField}
                value={formData.message}
                onChange={handleChange}
                required
              />
              <span className={styles.inputLabel}>Mensagem</span>
            </div>
          </div>

          <button type="submit" className={styles.sendBtn} title="Enviar mensagem">
            ENVIAR →
          </button>

          {submitted && (
            <div className={styles.feedbackMsg}>
              ✓ Redirecionando para o WhatsApp da DevWeb com a sua mensagem...
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default GetInTouchSection;
