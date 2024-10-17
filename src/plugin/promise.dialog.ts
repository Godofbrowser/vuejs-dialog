'use strict'

import DialogComponent from './components/DialogApp.vue'
import { DEFAULT_OPTIONS } from './constants.ts'
import { mergeObjs } from './utilities.ts'
import { createApp, type InjectionKey } from "vue";

import type {App, ComponentInstance} from "vue";
import type {DialogWindowOptions, Message, DialogResolverPayload} from "./interface";
import {DialogTypeEnum} from "./interface.ts";
import {ConfirmDirective} from "./directive.dialog.ts";


interface DialogPluginOptions extends Omit<DialogWindowOptions, 'id'>{}

export const propertyKey = '$dialog'
export const injectionKey: InjectionKey<PromiseDialog> = Symbol.for(propertyKey)

export class PromiseDialog {
    private dgApp: App;
    private dgAppComponentInstance: ComponentInstance<typeof DialogComponent>;

    /**
     * @internal
     */
    private mounted = false;


    constructor(
        private readonly contextApp?: App,
        private readonly globalOptions?: Partial<DialogPluginOptions>,
    ) {
        this.globalOptions = mergeObjs(DEFAULT_OPTIONS, globalOptions)
    }

    private open(type: DialogTypeEnum, message?: Message, localOptions: Partial<DialogPluginOptions> = {}): Promise<DialogResolverPayload> {
        this.mountIfNotMounted()
        return new Promise((resolve) => {
            localOptions.window = type
            localOptions.promiseResolver = resolve
            if (message)
                localOptions.message = typeof message === "string" ? { title: '', body: message } : message

            this.dgAppComponentInstance.commit(mergeObjs(this.globalOptions, localOptions))
        })
    }

    public alert(message?: Message, options?: Partial<DialogWindowOptions>) {
        return this.open(DialogTypeEnum.alert, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }

    public confirm(message?: Message, options?: Partial<DialogWindowOptions>) {
        return this.open(DialogTypeEnum.confirm, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }

    public prompt(message?: Message, options?: Partial<DialogWindowOptions>) {
        return this.open(DialogTypeEnum.prompt, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }


    /**
     * @internal
     */
    private mountIfNotMounted(): void {
        if (this.mounted) return

        const dialogApp = createApp(DialogComponent)
        const node = document.createElement('div')
        document.querySelector('body').appendChild(node)

        if (this.contextApp) {
            dialogApp.config.globalProperties = this.contextApp.config.globalProperties
            dialogApp._context.components = this.contextApp._context.components
            dialogApp._context.directives = this.contextApp._context.directives
            dialogApp._context.mixins = this.contextApp._context.mixins
            dialogApp._context.provides = this.contextApp._context.provides
        }

        this.dgApp = dialogApp
        this.dgAppComponentInstance = dialogApp.mount(node) as ComponentInstance<typeof DialogComponent>
        this.mounted = true
    }

    private destroy(): void {
        if (!this.mounted) return

        this.dgApp.unmount()
        delete this.dgAppComponentInstance
        delete this.dgApp
        this.mounted = false
    }

    /**
     * @internal
     */
    private static dialogInstance: PromiseDialog

    public static install(app: App<Element>, options?: DialogPluginOptions) {
        if (PromiseDialog.dialogInstance) {
            PromiseDialog.dialogInstance.destroy()
            delete PromiseDialog.dialogInstance
        }

        const dialogInstance = new PromiseDialog(app, options)
        PromiseDialog.dialogInstance = dialogInstance

        app.directive('confirm', ConfirmDirective.createInstaller(dialogInstance))
        app.provide(injectionKey, dialogInstance)
        Object.defineProperties(app.config.globalProperties, {
            [propertyKey]: {
                get: () => dialogInstance
            }
        })
    }

    public static getInstance() {
        if (!PromiseDialog.dialogInstance)
            throw new Error('PromiseDialog.getInstance called before installation')
        return PromiseDialog.dialogInstance
    }

    public static installStandalone(options?: DialogPluginOptions) {
        if (!PromiseDialog.dialogInstance) {
            PromiseDialog.dialogInstance = new PromiseDialog(undefined, options)
        }
        return PromiseDialog.dialogInstance
    }
}
