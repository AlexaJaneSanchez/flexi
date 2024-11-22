import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@pinia/nuxt'],
    css: ["~/assets/css/main.css"],
    plugins: [
        '@/plugins/vue-notification.ts',
        '@/plugins/vue3-apexcharts.js',
        { src: '~/plugins/vue3-apexcharts.js', mode: 'client' },
    ],
    postcss: {
        plugins:
        {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            appName: process.env.APP_NAME,
            apiBaseURL: process.env.API_BASE_URL,
        },
    },
    ssr: false,

    vite: {
        plugins: [
            VueI18nVitePlugin({
                include: [resolve(dirname(fileURLToPath(import.meta.url)), './lang/*.json')],
            }),
        ],
    },

    compatibilityDate: "2024-07-10",

    app: {
        head: {
            title: 'FlexiPOS',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: '' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/test.png' }
            ]
        }
    }
});