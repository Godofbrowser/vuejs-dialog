'use strict'

import DirectiveDialog from './directive.dialog'

import type {App} from "vue";
import type {DialogWindowOptionsInterface} from "./interface";
import {PromiseDialog} from "./promise.dialog";


interface DialogPluginOptions extends Omit<DialogWindowOptionsInterface, 'id'>{}

// const injectionKey = Symbol('$dialog')
const DialogPlugin = {
    install(app: App, options: DialogPluginOptions) {
        const directivesInstance = new DirectiveDialog(app)
        const dialog = new PromiseDialog(app, options)

        app.directive('confirm', directivesInstance.defineConfirm())
        app.provide('$dialog', dialog)
        Object.defineProperties(app.config.globalProperties, {
            $dialog: {
                get: () => dialog
            }
        })
    },
}

export default DialogPlugin
