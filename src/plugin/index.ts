'use strict'

import Promise from 'promise-polyfill'
import DialogComponent from './components/DialogApp.vue'
import { DIALOG_TYPES, DEFAULT_OPTIONS } from './constants'
import Directives from './directives'
import { mergeObjs } from './utilities'
import {createApp} from "vue";

import type {App, ComponentInstance} from "vue";

enum DialogType {
    alert = DIALOG_TYPES.ALERT,
    confirm = DIALOG_TYPES.CONFIRM,
    prompt = DIALOG_TYPES.PROMPT,
}

interface DialogWindowOptions {
    id: string;
    message: string;
    window: DialogType;
    promiseResolver: () => void;
    promiseRejecter: () => void;
}

interface DialogPluginOptions extends Omit<DialogWindowOptions, 'id'>{}

const registeredViews = {}

class DialogPluginV3 {
    private dgApp: ComponentInstance<typeof DialogComponent>;

    private mounted = false;
    private registeredViews = {}

    constructor(
        private readonly app: App,
        private readonly globalOptions: Partial<DialogPluginOptions>,
    ) {
        this.globalOptions = mergeObjs(DEFAULT_OPTIONS, globalOptions)
    }

    public open(type: DialogType, message: string = undefined, localOptions: Partial<DialogWindowOptions> = {}) {
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

    public alert(message?: string, options?: Partial<DialogWindowOptions>) {
        return this.open(DialogType.alert, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }

    public confirm(message?: string, options?: Partial<DialogWindowOptions>) {
        return this.open(DialogType.confirm, message, {
            ...(options || {}),
            ...(message ? {message} : {}),
        })
    }

    public prompt(message?: string, options?: Partial<DialogWindowOptions>) {
        return this.open(DialogType.prompt, message, {
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

const Plugin = {
    install(app: App, options: DialogPluginOptions) {
        const DirectivesObj = new Directives(app)
        app.directive('confirm', DirectivesObj.defineConfirm())

        const dialog = new DialogPluginV3(app, options)

        Object.defineProperties(app.config.globalProperties, {
            $dialog: {
                get () {
                    return dialog
                }
            }
        })
    },
}

export default Plugin
