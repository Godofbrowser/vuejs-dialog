'use strict'

import DirectiveDialog from './directive.dialog'

import type {App} from "vue";
import type {DialogWindowOptionsInterface} from "./interface";
import {PromiseDialog} from "./promise.dialog";


interface DialogPluginOptions extends Omit<DialogWindowOptionsInterface, 'id'>{}

const DialogPlugin = {
    install(app: App, options: DialogPluginOptions) {
        const DirectivesInstance = new DirectiveDialog(app)
        app.directive('confirm', DirectivesInstance.defineConfirm())

        const dialog = new PromiseDialog(app, options)

        Object.defineProperties(app.config.globalProperties, {
            $dialog: {
                get () {
                    return dialog
                }
            }
        })
    },
}

export default DialogPlugin