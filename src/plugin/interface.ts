export type MessageWithTitle = {
    title: string;
    body: string;
}

export type Message = MessageWithTitle | String;

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

export enum ConfirmTypeEnum {
    basic = 'basic',
    soft = 'soft',
    hard = 'hard',
}

export interface DialogOptions {
    message: MessageWithTitle;
    html: boolean;
    loader: boolean;
    reverse: boolean;
    backdropClose: boolean;
    okText: string;
    cancelText: string;
    type: ConfirmTypeEnum,
    clicksCount: number;
    animation: 'zoom' | 'bounce' | 'fade';
    customClass: {[k: string]: string};
    verification: string;
    verificationHelp: string;
    promptHelp: string;
}

export type DialogResolverPayload = {
    canceled: boolean;
    data?: string;
    close?: () => void;
    node?: HTMLElement;
}

export interface DialogWindowOptions extends DialogOptions {
    message: MessageWithTitle;
    window: DialogTypeEnum;
    promiseResolver: (payload?: DialogResolverPayload) => void;
}
