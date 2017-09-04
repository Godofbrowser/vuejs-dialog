"use strict"

import Vue from "vue"
import Notification from 'vue-notification'
import VuejsDialog from 'vuejs-dialog'
import AppComponent from '../components/app.vue'

Vue.use(Notification)

// Install VuejsDialog
Vue.use(VuejsDialog, {
    message: 'Please confirm action'
})

let App = Vue.extend(AppComponent)

window.vm = new App()
window.vm.$mount('#app')