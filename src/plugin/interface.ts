
export interface ButtonStateInterface {
    loading: boolean;
    disabled: boolean;
    visible: boolean;
    options: {[k: string]: any};
    component: any;
}


export enum DialogTypeEnum {
    alert = 'alert',
    confirm = 'confirm',
    prompt = 'prompt',
}

export interface DialogWindowOptionsInterface {
    id: string;
    message: string;
    window: DialogTypeEnum;
    promiseResolver: (payload?: {
        data: string;
        node?: HTMLElement;
        setLoading: (value: boolean) => void;
        close: (isLoading: boolean) => void;
    }) => void;
    promiseRejecter: () => void;
}
