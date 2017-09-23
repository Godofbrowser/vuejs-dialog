// Directives

import {noop, clickNode, cloneObj} from './utilities'
import {CONFIRM_TYPES} from './constants'


let Directives = function (Vue) {
    Object.defineProperties(this, {
        Vue: {get: () => Vue},
        confirmDefinition: {
            get: this.defineConfirm
        },
        alertDefinition: {
            get: this.defineAlert
        }
    })
}

Directives.prototype.getConfirmMessage =  function(binding) {
    if (binding.value && binding.value.message) {
        return binding.value.message
    }
    return typeof binding.value === 'string' ? binding.value : null
}

Directives.prototype.getOptions =  function(binding) {
    let options = typeof binding.value === 'object' ? cloneObj(binding.value) : {}

    delete options['ok']
    delete options['cancel']

    if(binding.arg && CONFIRM_TYPES.hasOwnProperty(binding.arg.toUpperCase())){
        options.type = CONFIRM_TYPES[binding.arg.toUpperCase()]
    }

    return options
}

Directives.prototype.getThenCallback =  function(binding, el){
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

Directives.prototype.getCatchCallback =  function(binding) {
    if (binding.value && binding.value.cancel) {
        return binding.value.cancel
    }
    return noop
}



Directives.prototype.defineConfirm = function () {
    const _this = this
    const DirectiveDefinition = {}

    const clickHandler = function (event, el, binding) {
        event.preventDefault()
        event.stopImmediatePropagation()

        let options = _this.getOptions(binding)
        let confirmMessage = _this.getConfirmMessage(binding)

        _this.Vue.dialog
            .confirm(confirmMessage, options)
            .then(_this.getThenCallback(binding, el))
            .catch(_this.getCatchCallback(binding))
    }

    DirectiveDefinition.bind = (el, binding) => {
        if (el.VuejsDialog === undefined) {
            el.VuejsDialog = {}
        }

        el.VuejsDialog.clickHandler = function (event) {
            clickHandler(event, el, binding)
        }

        el.addEventListener('click', el.VuejsDialog.clickHandler, true)
    }

    DirectiveDefinition.unbind = (el) => {
        el.removeEventListener('click', el.VuejsDialog.clickHandler, true)
    }

    return DirectiveDefinition
}

Directives.prototype.defineAlert = function () {
    // Still Considering it uses case.
}

export default Directives
