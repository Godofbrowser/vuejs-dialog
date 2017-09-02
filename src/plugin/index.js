'use strict'

import DialogComponent from './components/dialog.vue'
import {DIALOG_TYPES, DEFAULT_OPTIONS} from './js/constants'
import {mergeObjs} from './js/utilities'

let Plugin = function(Vue, globalOptions = {}){
	this.globalOptions = globalOptions
    this.mount(Vue)
}

Plugin.prototype.mount = function(Vue){
	this.Dialog = (() => {
        let DialogConstructor = Vue.extend(DialogComponent)
		let node = document.createElement("div")
		document.querySelector('body').appendChild(node)

		return (new DialogConstructor()).$mount(node)
	})()
}

Plugin.prototype.alert = function(message = null, options = {}){
	message && (options.message = message)
	return this.open(DIALOG_TYPES.ALERT, options)
}

Plugin.prototype.confirm = function(message = null, options = {}){
    message && (options.message = message)
    return this.open(DIALOG_TYPES.CONFIRM, options)
}

Plugin.prototype.open = function(type, localOptions = {}){
	return new Promise((resolve, reject) => {

        localOptions.id = 'dialog.' + Date.now()
        localOptions.window = type
        localOptions.promiseResolver = resolve
        localOptions.promiseRejecter = reject

		this.Dialog.commit(mergeObjs(DEFAULT_OPTIONS, this.globalOptions, localOptions))
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