// Directives

import {noop} from './utilities'

export default function (Vue) {
    let Directives = function () {}

    Directives.prototype.init = function (Vue) {
        this.Vue = Vue
        this.registerConfirm()
    }

    Directives.prototype.registerConfirm = function () {
        const _this = this

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
                        el.removeEventListener('click', el.VuejsDialog.confirmHandler, true)

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

                            el.addEventListener('click', el.VuejsDialog.confirmHandler, true)
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

        this.Vue.directive('confirm', {
            bind (el, binding) {
                if (el.VuejsDialog === undefined) {
                    el.VuejsDialog = {}
                }

                el.VuejsDialog.confirmHandler = function clickEventHandler(event) {
                    clickHandler(event, el, binding)
                }

                el.addEventListener('click', el.VuejsDialog.confirmHandler, true)
            },
            unbind (el) {
                el.removeEventListener('click', el.VuejsDialog.confirmHandler, true)
            }
        })


    }

    let D = new Directives()
    D.init(Vue)
}