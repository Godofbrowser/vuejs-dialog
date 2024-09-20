import {PromiseDialog} from "./promise.dialog";

declare module 'vue' {
    export interface ComponentCustomProperties {
        $dialog: typeof PromiseDialog;
    }
}
