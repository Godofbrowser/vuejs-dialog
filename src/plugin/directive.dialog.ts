// Directives

import { noop, clickNode, cloneObj } from './utilities'
import { CONFIRM_TYPES } from './constants'

const DirectiveDialog = function (app) {
    Object.defineProperties(this, {
        Vue: { get: () => app },
        confirmDefinition: {
            get: this.defineConfirm
        }
    })
}

DirectiveDialog.prototype.getConfirmMessage = function (binding) {
    if (binding.value && binding.value.message) {
        return binding.value.message
    }
    return typeof binding.value === 'string' ? binding.value : null
}

DirectiveDialog.prototype.getOptions = function (binding) {
    const options = typeof binding.value === 'object' ? cloneObj(binding.value) : {}

    delete options['ok']
    delete options['cancel']

    if (binding.arg && Object.prototype.hasOwnProperty.call(CONFIRM_TYPES, binding.arg.toUpperCase())) {
        options.type = CONFIRM_TYPES[binding.arg.toUpperCase()]
    }

    return options
}

DirectiveDialog.prototype.getThenCallback = function (binding, el) {
    if (binding.value && binding.value.ok) {
        return dialog => binding.value.ok({ ...dialog, node: el })
    } else {
        return dialog => {
            // If we got here, it means the default action is to be executed
            // We'll then stop the loader if it's enabled and close the dialog
            dialog.loading && dialog.close()

            // Unbind to allow original event
            el.removeEventListener('click', el.VuejsDialog.clickHandler, true)

            // Trigger original event
            clickNode(el)

            // Re-bind listener
            el.addEventListener('click', el.VuejsDialog.clickHandler, true)
        }
    }
}

DirectiveDialog.prototype.getCatchCallback = function (binding) {
    if (binding.value && binding.value.cancel) {
        return binding.value.cancel
    }
    return noop
}

DirectiveDialog.prototype.clickHandler = function (event, el, binding) {
    event.preventDefault()
    event.stopImmediatePropagation()

    const options = this.getOptions(binding)
    const confirmMessage = this.getConfirmMessage(binding)
    const thenCallback = this.getThenCallback(binding, el)
    const catchCallback = this.getCatchCallback(binding)

    this.Vue.dialog
        .confirm(confirmMessage, options)
        .then(thenCallback)
        .catch(catchCallback)
}

DirectiveDialog.prototype.defineConfirm = function () {
    type BindFn = (el: unknown, binding: unknown) => void
    const DirectiveDefinition: {bind: BindFn, unbind: BindFn} = {}

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

export default DirectiveDialog
