import { defineClientConfig } from 'vuepress/client'
import DialogPlugin from "../../src/plugin/index";

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.use(DialogPlugin, {})
    },
    setup() {},
    rootComponents: [],
})
