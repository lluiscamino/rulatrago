import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default {
    base: '/browser-games/',
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                rulatrago: resolve(__dirname, 'rulatrago.html'),
                piramide: resolve(__dirname, 'piramide.html')
            }
        }
    },
    define: {
        __BUILD_DATE__: JSON.stringify(new Date())
    }
}