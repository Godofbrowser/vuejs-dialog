import {Directive} from "vue";
import { noop, clickNode, cloneObj } from './utilities'
import {CONFIRM_TYPES, DIRECTIVE_ATTRIBUTE_KEY} from './constants'
import type { PromiseDialog } from './promise.dialog'
import type {DialogResolverPayload} from "./interface";


export class ConfirmDirective {
    shouldIgnoreClick = false

    constructor(private readonly dialog: PromiseDialog) {}

    private getConfirmMessage(binding: unknown) {
        if (binding.value && binding.value.message) {
            return binding.value.message
        }
        return typeof binding.value === 'string' ? binding.value : null
    }

    private getOptions(binding?: unknown) {
        const options = typeof binding?.value === 'object' ? cloneObj(binding.value) : {}

        delete options['ok']
        delete options['cancel']

        if (binding?.arg && Object.prototype.hasOwnProperty.call(CONFIRM_TYPES, binding.arg.toUpperCase())) {
            options.type = CONFIRM_TYPES[binding.arg.toUpperCase()]
        }

        return options
    }

    private getThenCallback(binding, el): (dialog: unknown) => void {
        if (binding?.value && binding.value.ok) {
            return dialog => binding.value.ok({ ...dialog, node: el })
        }
        return (dialog: DialogResolverPayload) => {
            // If we got here, it means the default action is to be executed
            // We'll then close the dialog even if it has loading enabled
            dialog.close && dialog.close()
            this.shouldIgnoreClick = true
            clickNode(el)
            this.shouldIgnoreClick = false
        }
    }

    private getCatchCallback(binding?: unknown) {
        if (binding?.value && binding.value.cancel) {
            return binding.value.cancel
        }
        return noop
    }

    private clickHandler(event, el, binding) {
        if (this.shouldIgnoreClick) return
        event.preventDefault()
        event.stopImmediatePropagation()

        const options = this.getOptions(binding)
        const confirmMessage = this.getConfirmMessage(binding)
        const thenCallback = this.getThenCallback(binding, el)
        const catchCallback = this.getCatchCallback(binding)

        this.dialog.confirm(confirmMessage, options)
            .then((payload) => {
                if (payload.canceled) return catchCallback.call(catchCallback, payload)
                ;thenCallback.call(thenCallback, payload)
            })
    }

    public static createInstaller(dialog: PromiseDialog): Directive {
        const directive = new ConfirmDirective(dialog)
        return {
            mounted: (el, binding) => {
                el[DIRECTIVE_ATTRIBUTE_KEY] = el[DIRECTIVE_ATTRIBUTE_KEY] || {}
                el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler = event => directive.clickHandler(event, el, binding)

                el.addEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
            },
            updated: (el, binding) => {
                el.removeEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
                el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler = event => directive.clickHandler(event, el, binding)
                el.addEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
            },
            unmounted: (el) => {
                el.removeEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
                delete el[DIRECTIVE_ATTRIBUTE_KEY]
            }
        }
    }
}
