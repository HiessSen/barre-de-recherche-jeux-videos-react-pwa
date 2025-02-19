import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/barre-de-recherche-jeux-videos-react-pwa',
  plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        // Mise à jour automatique du serice worker
        registerType: 'autoUpdate',
        // Fichiers à inclure dans le cache
        includeAssets: ['favicon.ico', 'apple-touche-icon.png', 'mask-icon.sgv'],

        // Configuration du manifest
        manifest: {
          name: 'Annuaire des jeux', // Nom complet
          short_name: 'Jeux', // Nom court pour l'écran d'accueil
          description: 'Application de recherche de jeux-vidéos',
          theme_color: '#ffffff', // Couleur du thème
          start_url: 'https://hiesssen.github.io/barre-de-recherche-jeux-videos-react-pwa/',
          display: 'standalone', // Mode d'affichage
          background_color: '#ffffff', // Couleur de fond au démarrage
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable' // L'icône peut être masquée (Android)
            }
          ]
        },
        workbox: {
          runtimeCaching: [{
            // Pattern pour les URLs de l'API RAWG
            urlPattern: /^https:\/\/api\.rawg\.io\/api/,
            // Stratégie de cache : sert le cache d'abord, puis met à jour
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
            // Configuration de l'expiration du cache
              expiration: {
                maxEntries: 100, // Nombre maximum d'entrées
                maxAgeSeconds: 86400 // Durée de vie (24h)
              },
            // Types de réponses à mettre en cache
              cacheableResponse: {
                statuses: [0, 200] // Codes HTTP acceptés
              }
            }
          }]
        }
      })
  ],
})
