// Directives

import {noop} from './utilities'


let Directives = function (Vue) {
    this.Vue = Vue
    this.confirmDefinition = this.defineConfirm()
    this.alertDefinition = this.defineAlert()
}

Directives.prototype.defineConfirm = function () {
    const _this = this
    const DirectiveDefinition = {}

    const clickHandler = function (event, el, binding) {
        event.preventDefault()
        event.stopImmediatePropagation()

        let confirmMessage = (function () {
            if (binding.value && binding.value.message) {
                return binding.value.message
            }
            return typeof binding.value === 'string' ? binding.value : null
        })()

        let thenCallback = (function () {
            if (binding.value && binding.value.ok) {
                return binding.value.ok
            } else {
                return () => {
                    el.removeEventListener('click', el.VuejsDialog.clickHandler, true)

                    _this.Vue.nextTick(() => {
                        (function (node) {
                            if (document.createEvent) {
                                let evt = document.createEvent('MouseEvents');
                                evt.initEvent('click', true, false);
                                node.dispatchEvent(evt);
                            } else if (document.createEventObject) {
                                node.fireEvent('onclick');
                            } else if (typeof node.onclick === 'function') {
                                node.onclick();
                            }
                        })(el)

                        el.addEventListener('click', el.VuejsDialog.clickHandler, true)
                    })
                }
            }
        })()

        let catchCallback = (function () {
            if (binding.value && binding.value.cancel) {
                return binding.value.cancel
            }
            return noop
        })()

        _this.Vue.dialog.confirm(confirmMessage).then(thenCallback).catch(catchCallback)
    }

    DirectiveDefinition.bind = (el, binding) => {
        if (el.VuejsDialog === undefined) {
            el.VuejsDialog = {}
        }

        el.VuejsDialog.clickHandler = function clickEventHandler(event) {
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
    //
}

export default Directives
