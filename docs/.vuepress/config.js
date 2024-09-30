import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import {shikiPlugin} from "@vuepress/plugin-shiki";
// import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

// Ref (default theme): https://ecosystem.vuejs.press/themes/default/markdown.html

export default defineUserConfig({
    title: 'Vuejs Dialog (Vue3)',
    description: 'A lightweight, promise based alert, prompt and confirm dialog',
    base: process.env.NODE_ENV === 'production' ? '/vuejs-dialog/' : '/',
    bundler: viteBundler(),
    plugins: [
        // https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
        // https://ecosystem.vuejs.press/plugins/markdown/shiki.html
        shikiPlugin({
            // options
            defaultLang: 'ts',
            langs: ['ts', 'js', 'json', 'vue', 'md', 'bash', 'diff'],
        }),
        // mdEnhancePlugin({
        //     // your options
        // }),
    ],
    theme: defaultTheme({
        repo: 'godofbrowser/vuejs-dialog',
        docsDir: 'docs',
        docsBranch: 'dev',
        navbar: [
            { text: 'Versions', children: [
                    { text: '2.x (vue3)', link: '/index.md' },
                    { text: '1.x (vue2)', link: '/1.x.md' }
                ]
            },
        ],
        sidebar: [
            '/index.md',
            '/features.md',
            '/digging-deeper.md',
            // '/demos.md',
            '/1.x.md',
        ]
    }),
})
