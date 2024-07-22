'use strict'

import Promise from 'promise-polyfill'
import DialogComponent from './components/DialogApp.vue'
import { DEFAULT_OPTIONS } from './constants'
import { mergeObjs } from './utilities'
import {createApp} from "vue";

import type {App, ComponentInstance} from "vue";
import {DialogTypeEnum} from "./interface";
import type {DialogWindowOptionsInterface} from "./interface";


interface DialogPluginOptions extends Omit<DialogWindowOptionsInterface, 'id'>{}


export class PromiseDialog {
    private dgApp: ComponentInstance<typeof DialogComponent>;

    private mounted = false;

    constructor(
        private readonly app: App,
        private readonly globalOptions: Partial<DialogPluginOptions>,
    ) {
        this.globalOptions = mergeObjs(DEFAULT_OPTIONS, globalOptions)
    }

    public open(type: DialogTypeEnum, message: string = undefined, localOptions: Partial<DialogWindowOptionsInterface> = {}) {
        this.mountIfNotMounted()
        return new Promise((resolve, reject) => {
            localOptions.id = 'dialog.' + Date.now()
            localOptions.window = type
            localOptions.message = message
            localOptions.promiseResolver = resolve
            localOptions.promiseRejecter = reject

            this.dgApp.commit(mergeObjs(this.globalOptions, localOptions))
        })
    }

    public alert(message?: string, options?: Partial<DialogWindowOptionsInterface>) {
        return this.open(DialogTypeEnum.alert, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }

    public confirm(message?: string, options?: Partial<DialogWindowOptionsInterface>) {
        return this.open(DialogTypeEnum.confirm, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }

    public prompt(message?: string, options?: Partial<DialogWindowOptionsInterface>) {
        return this.open(DialogTypeEnum.prompt, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }

    private mountIfNotMounted(): void {
        if (this.mounted) return

        this.dgApp = (() => {
            const dialogApp = createApp(DialogComponent)
            const node = document.createElement('div')
            document.querySelector('body').appendChild(node)
            return dialogApp.mount(node) as ComponentInstance<DialogComponent>
        })()

        this.mounted = true
    }
}
