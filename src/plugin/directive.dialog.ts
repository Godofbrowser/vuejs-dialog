import { noop, clickNode, cloneObj } from './utilities'
import {CONFIRM_TYPES, DIRECTIVE_ATTRIBUTE_KEY} from './constants'


const DirectiveDialog = function (app) {
    this.shouldIgnoreClick = false
    this.bindingOptions = {

    }

    Object.defineProperties(this, {
        app: { get: () => app },
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
            this.shouldIgnoreClick = true
            clickNode(el)
            this.shouldIgnoreClick = false
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
    if (this.shouldIgnoreClick) return
    event.preventDefault()
    event.stopImmediatePropagation()

    const options = this.getOptions(binding)
    const confirmMessage = this.getConfirmMessage(binding)
    const thenCallback = this.getThenCallback(binding, el)
    const catchCallback = this.getCatchCallback(binding)

    this.app.config.globalProperties.$dialog
        .confirm(confirmMessage, options)
        .then(thenCallback)
        .catch(catchCallback)
}

DirectiveDialog.prototype.defineConfirm = function () {
    type BindFn = (el: unknown, binding: unknown) => void
    type UpdateFn = (el: unknown, binding: unknown, vnode: unknown, prevVnode: unknown) => void
    const DirectiveDefinition: {mounted: BindFn, unmounted: BindFn, updated: UpdateFn} = {
        mounted: (el, binding) => {
            el[DIRECTIVE_ATTRIBUTE_KEY] = el[DIRECTIVE_ATTRIBUTE_KEY] || {}
            el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler = event => this.clickHandler(event, el, binding)

            el.addEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
        },
        updated: (el, binding, vnode, prevVnode) => {
            el.removeEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
            el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler = event => this.clickHandler(event, el, binding)
            el.addEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
        },
        unmounted: (el) => {
            el.removeEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
            delete el[DIRECTIVE_ATTRIBUTE_KEY]
        }
    }

    return DirectiveDefinition
}

export default DirectiveDialog
