// constants
export const DIALOG_TYPES = {
	ALERT: 'alert', // ex: Congrats! record created
	CONFIRM: 'confirm', // ex: Please confirm delete
	PROMPT: 'prompt' // ex: Type your password to save changes
}

export const CONFIRM_TYPES = {
	BASIC: 'basic', // ex: click to confirm
	SOFT: 'soft', // ex: click 3 times to confirm
	HARD: 'hard' // ex: enter verification, then click to confirm
}

export const ANIMATION_TYPES = {
	FADE: 'dg-fade',
	ZOOM: 'dg-zoom',
	BOUNCE: 'dg-bounce'
}

export const CLASS_TYPES = {
	MAIN_CONTENT: 'mainContent',
	BODY: 'body',
	TITLE: 'title',
	FOOTER: 'footer',
	OK_BTN: 'okBtn',
	CANCEL_BTN: 'cancelBtn'
}

export const DEFAULT_OPTIONS = {
	html                 : false,
	loader               : false,
	reverse              : false,
	backdropClose        : false,
	okText               : 'Continue',
	cancelText           : 'Close',
	view                 : null,
	type                 : CONFIRM_TYPES.BASIC,
	window               : DIALOG_TYPES.CONFIRM,
	message              : 'Proceed with the request?',
	clicksCount          : 3,
	animation            : 'zoom',
	customClass          : '',
	verification         : 'continue',
	verificationHelp     : 'Type "[+:verification]" below to confirm'
}
