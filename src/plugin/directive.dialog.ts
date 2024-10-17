import type {Directive, DirectiveBinding} from "vue";
import { noop, clickNode, cloneObj } from './utilities.ts'
import {CONFIRM_TYPES, DIRECTIVE_ATTRIBUTE_KEY} from './constants.ts'
import type { PromiseDialog } from './promise.dialog.ts'
import type {DialogOptions, DialogResolverPayload} from "./interface.ts";


type Binding = DirectiveBinding<DialogOptions | string>

export class ConfirmDirective {
    shouldIgnoreClick = false

    constructor(private readonly dialog: PromiseDialog) {}

    private getConfirmMessage(binding: Binding) {
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

    private getProceedCallback(binding: Binding, el: HTMLElement): (dialog: unknown) => void {
        if (binding?.value && binding.value.ok) {
            return (dialog: DialogResolverPayload) => {
                const okPayload: DialogResolverPayload = { ...dialog, node: el }
                binding.value.ok(okPayload)
            }
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

    private getCancelCallback(binding?: Binding) {
        if (binding?.value && binding.value.cancel) {
            return binding.value.cancel
        }
        return noop
    }

    private clickHandler(event, el, binding: Binding) {
        if (this.shouldIgnoreClick) return
        event.preventDefault()
        event.stopImmediatePropagation()

        const options = this.getOptions(binding)
        const confirmMessage = this.getConfirmMessage(binding)
        const proceedCallback = this.getProceedCallback(binding, el)
        const cancelCallback = this.getCancelCallback(binding)

        this.dialog.confirm(confirmMessage, options)
            .then((payload) => {
                if (payload.canceled) return cancelCallback.call(cancelCallback, payload)
                ;proceedCallback.call(proceedCallback, payload)
            })
    }

    public static createInstaller(dialog: PromiseDialog): Directive {
        const directive = new ConfirmDirective(dialog)
        return {
            mounted: (el, binding: Binding) => {
                el[DIRECTIVE_ATTRIBUTE_KEY] = el[DIRECTIVE_ATTRIBUTE_KEY] || {}
                el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler = event => directive.clickHandler(event, el, binding)

                el.addEventListener('click', el[DIRECTIVE_ATTRIBUTE_KEY].clickHandler, true)
            },
            updated: (el, binding: Binding) => {
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
