'use strict'

import Promise from 'promise-polyfill'
import DialogComponent from '../components/dialog.vue'
import {DIALOG_TYPES, DEFAULT_OPTIONS} from './constants'
import Directives from './directives'
import {mergeObjs} from './utilities'


let Plugin = function(Vue, globalOptions = {}){
	this.Vue = Vue
	this.mounted = false
	this.Dialog = {}
    this.globalOptions = mergeObjs(DEFAULT_OPTIONS, globalOptions)
}

Plugin.prototype.mountIfNotMounted = function(){
	if(this.mounted === true){
		return
	}

	this.Dialog = (() => {
		let DialogConstructor = this.Vue.extend(DialogComponent)
		let node = document.createElement("div")
		document.querySelector('body').appendChild(node)

		return (new DialogConstructor()).$mount(node)
	})()

	this.mounted = true

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
	this.mountIfNotMounted()
	return new Promise((resolve, reject) => {

        localOptions.id = 'dialog.' + Date.now()
        localOptions.window = type
        localOptions.promiseResolver = resolve
        localOptions.promiseRejecter = reject

		this.Dialog.commit(mergeObjs(this.globalOptions, localOptions))
	})
}

Plugin.install = function (Vue, options) {

    let DirectivesObj = new Directives(Vue)

	Vue.directive('confirm', DirectivesObj.confirmDefinition)

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