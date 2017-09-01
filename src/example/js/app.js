"use strict"

import Vue from "vue"
import VuejsDialog from "../../plugin/index"
import Notifivation from 'vue-notification'
import AppComponent from '../components/app.vue'

Vue.use(VuejsDialog)
Vue.use(Notifivation)

let App = Vue.extend(AppComponent)

window.vm = new App()
window.vm.$mount('#app')