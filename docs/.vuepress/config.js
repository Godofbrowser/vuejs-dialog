import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import {shikiPlugin} from "@vuepress/plugin-shiki";
// import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

// Ref (default theme): https://ecosystem.vuejs.press/themes/default/markdown.html

export default defineUserConfig({
    title: 'Vuejs Dialog Plugin',
    description: 'A lightweight, promise based alert, prompt and confirm dialog',
    repo: 'godofbrowser/vuejs-dialog',
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
        docsDir: '/docs/content',
        sidebar: [
            {
                text: 'Getting started',
                collapsible: false,
                link:  '/',
                children: [
                    '/README.md'
                ]
            },
            '/content/features/README.md',
            {
                text: 'Advanced',
                collapsible: false,
                link:  '/content/customization/README.md',
                children: [
                    '/content/customization/README.md'
                ]
            }
        ]
    }),
})
