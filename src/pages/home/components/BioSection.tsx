import React, { useEffect, useRef, useState } from 'react';
import styles from './BioSection.module.css';
import geraldoMiguelImg from '../../../assets/images/equipe-devweb-geraldo-bruno-douglas-miqueias.webp';

export const BioSection: React.FC = () => {
  const duoRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = duoRef.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, []);

  return (
    <section id="equipe">
      <div className={styles.container}>
        <div className="head2">
          <h2>Conheça nossa equipe</h2>
          <p>Dois analistas de sistemas que cuidam do seu projeto do primeiro contato à publicação.</p>
        </div>

        <div
          ref={duoRef}
          className={`${styles.duo} ${isInView ? styles.in : ''}`}
          id="duo"
        >
          <div className={`${styles.pe} ${styles.l}`} aria-hidden="true">
            <b>Geraldo Bruno</b>
            <p>Analista de Sistemas</p>
            <span>Especialista em UX Mobile</span>
          </div>

          <div className={`${styles.pe} ${styles.r}`} aria-hidden="true">
            <b>Douglas Miquéias</b>
            <p>Analista de Sistemas</p>
            <span>Especialista em Java e Backend</span>
          </div>

          <img
            src={geraldoMiguelImg}
            alt="Geraldo Bruno e Douglas Miquéias sorrindo, vestidos de preto, um com o braço apoiado no ombro do outro"
            width="1100"
            height="705"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default BioSection;
