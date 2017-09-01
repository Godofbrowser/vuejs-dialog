'use strict'

import Vue from 'vue'
import DialogComponent from './components/dialog.vue'
import {TYPES, DEFAULT_OPTIONS} from './js/utilities/constants'


let Plugin = function(globalOptions){
	this.globalOptions = globalOptions
	this.mount()
}

Plugin.prototype.mount = function(){
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
	Vue.dialog = new Plugin()

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



/* BASIC USAGE *
vm.$dialog.confirm('Please confirm to continue')
	.then(function () {
		console.log('Clicked on proceed')
	})
	.catch(function () {
		console.log('Clicked on cancel')
	})
*/

/* AJAX LOADER *
vm.$dialog.confirm("If you delete this record, it'll be gone forever.", {
    loader: true // default: false - when set to true, the proceed button shows a loader when clicked.
    			// And a dialog object will be passed to the then() callback
})
	.then((dialog) => {
		// Triggered when proceed button is clicked

		// dialog.loading(false) // stops the proceed button's loader
		// dialog.loading(true) // starts the proceed button's loader again
		// dialog.close() // stops the loader and close the dialog

		// do some stuff like ajax request.
		setTimeout(() => {
			console.log('Delete action completed ')
			dialog.close()
		}, 2500)

	})
    .catch(() => {
        // Triggered when cancel button is clicked

        console.log('Delete aborted')
    })
*/