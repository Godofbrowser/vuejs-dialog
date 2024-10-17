import {PromiseDialog} from "./promise.dialog.ts";
import {ConfirmDirective} from './directive.dialog.ts'

declare module 'vue' {
    export interface ComponentCustomProperties {
        $dialog: typeof PromiseDialog;
    }

    export interface GlobalDirectives {
        confirm: ReturnType<typeof ConfirmDirective.createInstaller>;
    }
}
