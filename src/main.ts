import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import dialogPlugin from './plugin/index'

const app = createApp(App)

app.use(router)
app.use(dialogPlugin)

app.mount('#app')

app.config.errorHandler = (err) => {
    /* handle error */
    console.error('Error handler: ', err);
}
