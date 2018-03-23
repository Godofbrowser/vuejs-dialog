// Directives

import { noop, clickNode, cloneObj } from './utilities'
import { CONFIRM_TYPES } from './constants'

let Directives = function (Vue) {
	Object.defineProperties(this, {
		Vue: { get: () => Vue },
		confirmDefinition: {
			get: this.defineConfirm
		}
	})
}

Directives.prototype.getConfirmMessage = function (binding) {
	if (binding.value && binding.value.message) {
		return binding.value.message
	}
	return typeof binding.value === 'string' ? binding.value : null
}

Directives.prototype.getOptions = function (binding) {
	let options = typeof binding.value === 'object' ? cloneObj(binding.value) : {}

	delete options['ok']
	delete options['cancel']

	if (binding.arg && CONFIRM_TYPES.hasOwnProperty(binding.arg.toUpperCase())) {
		options.type = CONFIRM_TYPES[binding.arg.toUpperCase()]
	}

	return options
}

Directives.prototype.getThenCallback = function (binding, el) {
	if (binding.value && binding.value.ok) {
		return binding.value.ok
	} else {
		return () => {
			// Unbind to allow original event
			el.removeEventListener('click', el.VuejsDialog.clickHandler, true)
			// Trigger original event
			clickNode(el)
			// Re-bind listener
			el.addEventListener('click', el.VuejsDialog.clickHandler, true)
		}
	}
}

Directives.prototype.getCatchCallback = function (binding) {
	if (binding.value && binding.value.cancel) {
		return binding.value.cancel
	}
	return noop
}

Directives.prototype.clickHandler = function (event, el, binding) {
	event.preventDefault()
	event.stopImmediatePropagation()

	let options = this.getOptions(binding)
	let confirmMessage = this.getConfirmMessage(binding)
	let thenCallback = this.getThenCallback(binding, el)
	let catchCallback = this.getCatchCallback(binding)

	this.Vue.dialog
		.confirm(confirmMessage, options)
		.then(thenCallback)
		.catch(catchCallback)
}

Directives.prototype.defineConfirm = function () {
	const DirectiveDefinition = {}

	DirectiveDefinition.bind = (el, binding) => {
		el.VuejsDialog = el.VuejsDialog || {}

		el.VuejsDialog.clickHandler = event => this.clickHandler(event, el, binding)

		el.addEventListener('click', el.VuejsDialog.clickHandler, true)
	}

	DirectiveDefinition.unbind = (el) => {
		el.removeEventListener('click', el.VuejsDialog.clickHandler, true)
	}

	return DirectiveDefinition
}

export default Directives
