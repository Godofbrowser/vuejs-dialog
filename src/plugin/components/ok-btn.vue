<template>
    <button v-if="enabled" :class="['dg-btn', 'dg-btn--ok', {'dg-btn--loading': loading}, {'dg-pull-right': !options.reverse}]"
            @click.prevent="proceed()" ref="btn" :disabled="is_disabled">
        <span class="dg-btn-content">
            <slot></slot>
            <span v-if="soft_confirm">({{ clicks_remaining }})</span>
        </span>
        <span is="btn-loader" v-if="loading"></span>
    </button>
</template>

<script>
    import BtnLoader from './btn-loader.vue'
    import {DIALOG_TYPES, CONFIRM_TYPES, ANIMATION_TYPES} from '../js/constants'

    export default {
        data(){
            return {
                clicks_count: 0
            }
        },
        props: ['enabled', 'options', 'focus', 'loading'],
        mounted(){
            this.focus && this.$refs.btn.focus()
        },
        computed: {
            soft_confirm(){
                return (this.options.type === CONFIRM_TYPES.SOFT)
            },
            hard_confirm(){
                return (this.options.type === CONFIRM_TYPES.HARD)
            },
            is_disabled(){
                console.log((this.$parent.okBtnDisabled))
                return (this.$parent.okBtnDisabled)
            },
            clicks_remaining(){
                return Math.max((this.options.clicksCount - this.clicks_count), 0)
            }
        },
        methods: {
            proceed(){
                if(!this.is_disabled && this.validateProceed()){
                    this.$emit('click')
                }
            },
            validateProceed(){
                switch (this.options.type){
                    case CONFIRM_TYPES.SOFT:
                        this.clicks_count++
                        return (this.clicks_count >= this.options.clicksCount)
                        break;
                    case CONFIRM_TYPES.BASIC:
                    default:
                        return true;
                }
            },
        },
        components: {BtnLoader}
    }
</script>