import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { PromiseDialog } from '@/plugin/promise.dialog.ts'


const app = createApp(App)

app.use(router)
app.use(PromiseDialog)

app.mount('#app')

app.config.errorHandler = (err) => {
    /* handle error */
    console.error('Error handler: ', err);
}
