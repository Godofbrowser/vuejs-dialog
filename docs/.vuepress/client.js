import {defineAsyncComponent} from "vue";
import { defineClientConfig } from 'vuepress/client'
import VuejsDialog from "../../src/plugin/index.ts";


export default defineClientConfig({
    enhance({ app, router, siteData }) {
        const registerComponent = (fileName) => app.component(
            fileName,
            defineAsyncComponent(() => import(`../components/examples/${fileName}.vue`))
        )

        app.use(VuejsDialog)
        registerComponent('UIExamplesButton')
        registerComponent('UIExamplesWrapper')
        registerComponent('FeaturesExampleAlert')
        registerComponent('FeaturesExampleConfirm')
        registerComponent('FeaturesExampleConfirmSoft')
        registerComponent('FeaturesExampleConfirmHard')
        registerComponent('FeaturesExamplePrompt')
        registerComponent('FeaturesExampleDirective')
        registerComponent('OptionsExampleAnimation')
        registerComponent('OptionsExampleLoader')
    },
    setup() {},
    rootComponents: [],
})
