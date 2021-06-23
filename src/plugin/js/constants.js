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
	ROOT_CLASS: 'rootClass',
	CONTAINER_CLASS: 'containerClass',
	CONTENT_CLASS: 'contentClass',
	MAIN_CONTENT: 'mainContent'
}

export const CUSTOM_CLASS = {
	[CLASS_TYPES.ROOT_CLASS] : '',
	[CLASS_TYPES.CONTAINER_CLASS] : '',
	[CLASS_TYPES.CONTENT_CLASS] : '',
	[CLASS_TYPES.MAIN_CONTENT] : ''
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
	customClass          : CUSTOM_CLASS,
	verification         : 'continue',
	verificationHelp     : 'Type "[+:verification]" below to confirm',
	promptHelp      	 : 'Type in the box below and click "[+:okText]"'
}
