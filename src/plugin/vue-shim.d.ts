import {PromiseDialog} from "./promise.dialog";
import {ConfirmDirective} from './directive.dialog'

declare module 'vue' {
    export interface ComponentCustomProperties {
        $dialog: typeof PromiseDialog;
    }

    export interface GlobalDirectives {
        confirm: ReturnType<typeof ConfirmDirective.createInstaller>;
    }
}
