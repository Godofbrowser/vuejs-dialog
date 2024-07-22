import {createApp} from "vue";

declare module '@vue/runtime-core' {
    import {PromiseDialog} from "./promise.dialog";

    interface ComponentCustomProperties {
        $dialog: typeof PromiseDialog
    }
}
