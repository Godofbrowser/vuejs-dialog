'use strict'

/**
 * Created by Emmy on 3/23/2018.
 */

import { DIALOG_TYPES, CONFIRM_TYPES } from '../../js/constants'

import MessageMixin from '../../js/mixins/message-mixin'
import ButtonMixin from '../../js/mixins/btn-mixin'

export default {
	data: function () {
		return {
			input: '',
			loading: false
		}
	},
	props: {
		options: {
			type: Object,
			required: true
		}
	},
	computed: {
		loaderEnabled () {
			return !!this.options.loader
		},
		isHardConfirm () {
			return this.options.window === DIALOG_TYPES.CONFIRM &&
                this.options.type === CONFIRM_TYPES.HARD
		},
		isPrompt () {
			return (this.options.window === DIALOG_TYPES.PROMPT)
		},
		leftBtnComponent () {
			return (this.options.reverse === false) ? 'cancel-btn' : 'ok-btn'
		},
		rightBtnComponent () {
			return (this.options.reverse === true) ? 'cancel-btn' : 'ok-btn'
		},
		hardConfirmHelpText () {
			return this.options.verificationHelp
				.replace(/\[\+:(\w+)]/g, (match, $1) => {
					return this.options[$1] || match
				})
		},
		promptHelpText () {
			return this.options.promptHelp
				.replace(/\[\+:(\w+)]/g, (match, $1) => {
					return this.options[$1] || match
				})
		}
	},
	mounted () {
		this.isHardConfirm && this.$refs.inputElem && this.$refs.inputElem.focus()
	},
	methods: {
		clickRightBtn () {
			this.options.reverse ? this.cancel() : this.proceed(this.getDefaultData())
		},
		clickLeftBtn () {
			this.options.reverse ? this.proceed(this.getDefaultData()) : this.cancel()
		},
		submitDialogForm () {
			this.okBtnDisabled || this.proceed()
		},
		getDefaultData () {
			return this.isPrompt ? this.input : null
		},
		proceed (withData = null) {
			if (this.loaderEnabled) {
				this.switchLoadingState(true)
				this.options.promiseResolver({
					close: this.close,
					loading: this.switchLoadingState,
					data: withData
				})
			} else {
				this.options.promiseResolver({
					data: withData
				})
				this.close()
			}
		},
		cancel () {
			if (this.loading === true) { return }
			this.close()
		},
		switchLoadingState (loading = null) {
			if (loading === null) {
				loading = !this.loading
			}

			this.loading = !!loading
		},
		close () {
			this.$emit('close')
		}
	},
	mixins: [MessageMixin, ButtonMixin]
}
