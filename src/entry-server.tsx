import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { SITE } from './seo/siteConfig';
export { buildStructuredData } from './seo/structuredData';

/** Gera o HTML estático da página (pré-renderização para buscadores). */
export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
