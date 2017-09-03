"use strict"

import Vue from "vue"
import Notification from 'vue-notification'
import AppComponent from '../components/app.vue'

Vue.use(Notification)

let App = Vue.extend(AppComponent)

window.vm = new App()
window.vm.$mount('#app')