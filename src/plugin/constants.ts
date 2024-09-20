// constants
export const DIRECTIVE_ATTRIBUTE_KEY = '__VUEJS_DIALOG__'
export const DIALOG_TYPES = {
    ALERT: 'alert',     // ex: Congrats! record created
    CONFIRM: 'confirm', // ex: Please confirm delete
    PROMPT: 'prompt'    // ex: Type your password to save changes
}

export const CONFIRM_TYPES = {
    BASIC: 'basic', // ex: click to confirm
    SOFT: 'soft',   // ex: click 3 times to confirm
    HARD: 'hard'    // ex: enter verification, then click to confirm
}

export const ANIMATION_TYPES = {
    FADE: 'dg-fade',
    ZOOM: 'dg-zoom',
    BOUNCE: 'dg-bounce'
}

export const CLASS_TYPES = {
    MAIN_CONTENT: 'mainContent',
    BODY: 'body',
    FOOTER: 'footer',
    OK: 'ok',
    CANCEL: 'cancel'
}

export const CUSTOM_CLASS = {
    [CLASS_TYPES.MAIN_CONTENT] : '',
    [CLASS_TYPES.BODY]         : '',
    [CLASS_TYPES.FOOTER]       : '',
    [CLASS_TYPES.OK]           : '',
    [CLASS_TYPES.CANCEL]       : ''
}

export const DEFAULT_OPTIONS = {
    html                 : false,
    loader               : false,
    reverse              : false,
    backdropClose        : false,
    okText               : "Continue",
    cancelText           : "Close",
    type                 : CONFIRM_TYPES.BASIC,
    window               : DIALOG_TYPES.CONFIRM,
    message              : "Please confirm to proceed",
    clicksCount          : 3,
    animation            : 'zoom',
    customClass          : CUSTOM_CLASS,
    verification         : 'continue',
    verificationHelp     : 'Type "[+:verification]" below to confirm',
    promptHelp      	 : 'Type in the box below and click "[+:okText]"'
}
