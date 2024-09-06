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
    theme: defaultTheme(),
})
