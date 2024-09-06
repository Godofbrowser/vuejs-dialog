import {defineAsyncComponent} from "vue";
import { defineClientConfig } from 'vuepress/client'
import DialogPlugin from "../../src/plugin/index";


export default defineClientConfig({
    enhance({ app, router, siteData }) {
        const registerComponent = (fileName) => app.component(
            fileName,
            defineAsyncComponent(() => import((`../components/examples/${fileName}.vue`)))
        )

        app.use(DialogPlugin, {})
        registerComponent('UIExamplesButton')
        registerComponent('FeaturesExampleAlert')
        registerComponent('FeaturesExampleConfirm')
        registerComponent('FeaturesExampleConfirmSoft')
        registerComponent('FeaturesExampleConfirmHard')
        registerComponent('FeaturesExamplePrompt')
    },
    setup() {},
    rootComponents: [],
})
