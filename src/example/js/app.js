"use strict"

import Vue from "vue"
const VuejsDialog = window.vuejsDialog.default
import Notification from 'vue-notification'
import AppComponent from '../components/app.vue'

console.log(VuejsDialog, VuejsDialog.default)

Vue.use(VuejsDialog)
Vue.use(Notification)

let App = Vue.extend(AppComponent)

window.vm = new App()
window.vm.$mount('#app')