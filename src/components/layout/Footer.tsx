import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  onOpenBriefing?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBriefing }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTalkClick = (e: React.MouseEvent) => {
    if (onOpenBriefing) {
      e.preventDefault();
      onOpenBriefing();
    }
  };

  return (
    <footer className={styles.footer} id="footer">
      {/* Background Architectural Grid Lines */}
      <div className={styles.gridOverlay} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={styles.gridCol} />
        ))}
      </div>

      <div className={styles.container}>
        {/* Top Header Row */}
        <div className={styles.topRow}>
          <a
            href="#briefing"
            onClick={handleTalkClick}
            className={styles.talkLink}
          >
            Vamos conversar <span className={styles.arrow}>→</span>
          </a>

          <div className={styles.linksGroup}>
            <a href="mailto:contato@devweb.com.br" className={styles.linkItem}>
              contato@devweb.com.br
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/5534998418664"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              WhatsApp
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Big Impact Statement */}
        <div className={styles.statementWrap}>
          <h2 className={styles.statement}>
            <span>DIGA OLÁ.</span>
            <span>TRAGA A IDEIA.</span>
            <span>NÓS RESOLVEMOS.</span>
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            © 2026 DEVWEB. TODOS OS DIREITOS RESERVADOS.
          </span>
          <a
            href="#topo"
            onClick={scrollToTop}
            className={styles.backToTop}
          >
            VOLTAR AO TOPO ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
