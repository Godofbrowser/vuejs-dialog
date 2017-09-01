export const TYPES = {
    CONFIRM: 'confirm',
    HARD_CONFIRM: 'hard_confirm',
    SOFT_CONFIRM: 'soft_confirm',
    ALERT: 'alert'
}

export const DEFAULT_OPTIONS = {
    type: TYPES.CONFIRM,
    html: false,
    loader: false,
    headline: "Please confirm",
    message: "Proceed with the request?",
    helpText: "Click the proceed button to continue",
    clickCount: 3,
    verification: 'continue'
}