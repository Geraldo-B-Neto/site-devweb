import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import logoImg from '../../assets/images/devweb-logo.webp';
import logoWhiteImg from '../../assets/images/devweb-logo-white.webp';

interface HeaderProps {
  onOpenBriefing?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBriefing }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize theme from localStorage (default: dark)
  useEffect(() => {
    try {
      // Modo escuro é o padrão; só usa o claro se o visitante escolheu antes
      const saved = localStorage.getItem('dw-theme');
      const initial = saved === 'light' ? 'light' : 'dark';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    } catch {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Smart header: hidden until entering #presenca, and shows only when scrolling up
  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const root = document.documentElement;
          const currentY = window.scrollY;

          // Scroll progress bar
          const h = root.scrollHeight - window.innerHeight;
          const sp = h > 0 ? Math.min(1, currentY / h).toFixed(4) : '0';
          root.style.setProperty('--sp', sp);

          // Position of #presenca section
          const presenca = document.getElementById('presenca');
          let pastPresenca = false;
          if (presenca) {
            const presencaTop = presenca.getBoundingClientRect().top + currentY;
            // Visible only from #presenca downwards
            pastPresenca = currentY >= presencaTop - 80;
          }

          const diff = currentY - lastY;
          if (pastPresenca) {
            if (diff < -6) {
              // Scrolling UP
              setHeaderVisible(true);
              root.classList.add('nav-on');
            } else if (diff > 6) {
              // Scrolling DOWN
              setHeaderVisible(false);
              root.classList.remove('nav-on');
            }
          } else {
            // Above presence (Hero / Manifesto) - header stays hidden
            setHeaderVisible(false);
            root.classList.remove('nav-on');
          }

          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close menu on ESC or resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 1240) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('dw-theme', nextTheme);
    } catch {
      // ignore storage errors
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.header} ${headerVisible ? styles.visible : ''} ${isMenuOpen ? styles.open : ''}`}>
      <div className={`wrap ${styles.nav}`}>
        <a className={styles.logo} href="#topo" aria-label="DevWeb, início" onClick={closeMenu}>
          <img
            src={theme === 'dark' ? logoWhiteImg : logoImg}
            alt="DevWeb"
            width="141"
            height="30"
          />
        </a>

        <nav aria-label="Principal" className={styles.desktopNav}>
          <ul className={styles.menu}>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#conecta">Conecta</a></li>
            <li><a href="#projetos">Projetos</a></li>
            <li><a href="#processo">Como trabalhamos</a></li>
            <li><a href="#equipe">Equipe</a></li>
            <li><a href="#resultados">Resultados</a></li>
            <li><a href="#duvidas">Dúvidas</a></li>
          </ul>
        </nav>

        <div className={styles.navRight}>
          <button
            className={styles.themeToggle}
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>

          <a
            className={styles.ctaDesktop}
            href="#briefing"
            onClick={(e) => {
              if (onOpenBriefing) {
                e.preventDefault();
                onOpenBriefing();
              }
            }}
          >
            Preencher briefing
          </a>

          {/* Mobile hamburger button */}
          <button
            className={styles.menuBtn}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={styles.mobilePanel} id="mp">
        <ul>
          <li><a href="#servicos" onClick={closeMenu}>Serviços</a></li>
          <li><a href="#conecta" onClick={closeMenu}>Conecta</a></li>
          <li><a href="#projetos" onClick={closeMenu}>Projetos</a></li>
          <li><a href="#processo" onClick={closeMenu}>Como trabalhamos</a></li>
          <li><a href="#equipe" onClick={closeMenu}>Equipe</a></li>
          <li><a href="#resultados" onClick={closeMenu}>Resultados</a></li>
          <li><a href="#duvidas" onClick={closeMenu}>Dúvidas</a></li>
          <li>
            <a
              href="https://wa.me/5534997315975"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
              onClick={closeMenu}
            >
              Falar no WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
