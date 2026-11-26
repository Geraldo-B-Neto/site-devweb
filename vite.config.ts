import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE } from './src/seo/siteConfig'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'devweb-site-url',
      transformIndexHtml: (html) => html.replace(/__SITE_URL__/g, SITE.url),
    },
  ],
  base: './', // Allows smooth relative asset resolution for GitHub Pages
})
