'use strict'

import DialogComponent from './components/dialog.vue'
import {TYPES, DEFAULT_OPTIONS} from './js/utilities/constants'


let Plugin = function(Vue, globalOptions){
	this.globalOptions = globalOptions
    this.mount(Vue)
}

Plugin.prototype.mount = function(Vue){
	this.Dialog = (() => {
        let AppConstructor = Vue.extend(DialogComponent)
		let node = document.createElement("div")
		document.querySelector('body').appendChild(node)

		return (new AppConstructor()).$mount(node)
	})()
}

// Plugin.prototype.alert = function(message){
// 	alert(message)
// 	return Promise.resolve()
// }

Plugin.prototype.confirm = function(message = 'Are you sure?', localOptions = {}){
	return new Promise((resolve, reject) => {
		let id = 'confirm.' + Date.now()

		localOptions.id = id
		localOptions.type = TYPES.CONFIRM
		localOptions.message = message
		localOptions.promiseResolver = resolve
		localOptions.promiseRejecter = reject

		this.Dialog.commit(Object.assign(DEFAULT_OPTIONS, this.globalOptions, localOptions))
	})
}

Plugin.install = function (Vue, options) {
	Vue.dialog = new Plugin(Vue, options)

	Object.defineProperties(Vue.prototype, {
		$dialog: {
			get () {
				return Vue.dialog
			}
		}
	})
}

export default Plugin

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin)
}