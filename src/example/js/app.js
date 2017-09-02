"use strict"

import Vue from "vue"
import VuejsDialog from 'vuejs-dialog'
import Notification from 'vue-notification'
import AppComponent from '../components/app.vue'

Vue.use(VuejsDialog)
Vue.use(Notification)

let App = Vue.extend(AppComponent)

window.vm = new App()
window.vm.$mount('#app')