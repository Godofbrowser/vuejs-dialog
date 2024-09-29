import {defineAsyncComponent} from "vue";
import { defineClientConfig } from 'vuepress/client'
import {PromiseDialog} from "../../src/plugin/index";


export default defineClientConfig({
    enhance({ app, router, siteData }) {
        const registerComponent = (fileName) => app.component(
            fileName,
            defineAsyncComponent(() => import(`../components/examples/${fileName}.vue`))
        )

        app.use(PromiseDialog)
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
