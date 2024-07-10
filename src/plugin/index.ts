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
    type: DialogType;
}

interface DialogPluginOptions extends Omit<DialogWindowOptions, 'id'>{
}

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
            localOptions.type = type
            localOptions.message = message
            // localOptions.promiseResolver = resolve
            // localOptions.promiseRejecter = reject

            // this.dgApp.commit(mergeObjs(this.globalOptions, localOptions))
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

    private mountIfNotMounted(): void {
        if (this.mounted) return

        this.dgApp = (() => {
            const dialogApp = createApp(DialogComponent)
            const node = document.createElement('div')
            document.querySelector('body').appendChild(node)
            return dialogApp.mount(node)
        })()

        this.mounted = true
    }
}

const DialogPlugin = function (app, globalOptions: Partial<DialogPluginOptions> = {}) {
    this.app = app
    this.mounted = false
    this.$dgRoot = {} // The root component
    this.registeredViews = {} // Custom components
    this.globalOptions = mergeObjs(DEFAULT_OPTIONS, globalOptions)
}

DialogPlugin.prototype.mountIfNotMounted = function () {
    if (this.mounted === true) return

    this.$dgRoot = (() => {
        const dialogApp = createApp(DialogComponent)
        const node = document.createElement('div')
        document.querySelector('body').appendChild(node)

        // const Vm = new DialogConstructor()

        // Vm.registeredViews = this.registeredComponents()

        return dialogApp.mount(node)
    })()

    this.mounted = true
}

DialogPlugin.prototype.registeredComponents = function () {
    return registeredViews
}

DialogPlugin.prototype.registerComponent = function (name, definition) {
    if (this.mounted) {
        this.destroy()
    }

    // registeredViews[name] = this.app.extend(definition)
    registeredViews[name] = definition
}

DialogPlugin.prototype.destroy = function () {
    if (this.mounted === true) {
        this.$dgRoot.forceCloseAll()

        const elem = this.$dgRoot.$el
        this.$dgRoot.$destroy()
        this.$dgRoot.$off()
        elem.remove()
        this.mounted = false
    }
}

DialogPlugin.prototype.alert = function (message = null, options: Partial<DialogWindowOptions> = {}) {
    message && (options.message = message)
    return this.open(DIALOG_TYPES.ALERT, options)
}

DialogPlugin.prototype.prompt = function (message = null, options: Partial<DialogWindowOptions> = {}) {
    message && (options.message = message)
    return this.open(DIALOG_TYPES.PROMPT, options)
}

DialogPlugin.prototype.confirm = function (message = null, options: Partial<DialogWindowOptions> = {}) {
    message && (options.message = message)
    return this.open(DIALOG_TYPES.CONFIRM, options)
}

DialogPlugin.prototype.open = function (type, localOptions: Partial<DialogWindowOptions> = {}) {
    this.mountIfNotMounted()
    return new Promise((resolve, reject) => {
        localOptions.id = 'dialog.' + Date.now()
        localOptions.window = type
        localOptions.promiseResolver = resolve
        localOptions.promiseRejecter = reject

        this.$dgRoot.commit(mergeObjs(this.globalOptions, localOptions))
    })
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
