<template>
    <div @keydown.esc="close()">
        <transition name="zoomIn" appear="" @after-leave="anmiationEnded">
            <div v-if="show" ref="container" class="dg-container">
                <div class="dg-content-cont dg-content-cont--floating">
                    <div class="dg-main-content">
                        <!--<div class="dg-header">-->
                        <!---->
                        <!--</div>-->

                        <div v-if="options.html" class="dg-content" v-html="options.message"></div>
                        <div v-else="" class="dg-content">{{ options.message }}</div>

                        <div class="dg-footer">

                            <button @click="clickLeftBtn()" :is="leftBtnComponent" :loading="loading"
                                       :enabled="leftBtnEnabled" :reverse="options.reverse" :focus="leftBtnFocus">
                                <span>{{ options.reverse ? options.okText : options.cancelText}}</span>
                            </button>

                            <button :is="rightBtnComponent" @click="clickRightBtn()" :loading="loading"
                                       :enabled="rightBtnEnabled" :reverse="options.reverse" :focus="rightBtnFocus">
                                <span>{{ options.reverse ? options.cancelText : options.okText }}</span>
                            </button>

                            <div class="dg-clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div class="dg-backdrop"></div>
    </div>
</template>

<script>
    import OkBtn from './ok-btn.vue'
    import CancelBtn from './cancel-btn.vue'
    import {DIALOG_TYPES} from '../js/constants'

    export default {
        data: function () {
            return {
                show: true,
                canceled: false,
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
            loaderEnabled(){
                return !!this.options.loader
            },
            cancelBtnDisabled(){
                return (this.options.window === DIALOG_TYPES.ALERT)
            },
            leftBtnEnabled(){
                return (this.cancelBtnDisabled === false) || (this.options.reverse === true)
            },
            rightBtnEnabled(){
                return (this.cancelBtnDisabled === false) || (this.options.reverse === false)
            },
            leftBtnComponent(){
                return (this.options.reverse === false) ? 'cancel-btn' : 'ok-btn'
            },
            rightBtnComponent(){
                return (this.options.reverse === true) ? 'cancel-btn' : 'ok-btn'
            },
            leftBtnFocus(){
                return (this.options.reverse === true)
            },
            rightBtnFocus(){
                return (this.options.reverse === false)
            }
        },
        methods: {
            clickRightBtn(){
                this.options.reverse ? this.cancel() : this.proceed()
            },
            clickLeftBtn(){
                this.options.reverse ? this.proceed() : this.cancel()
            },
            proceed(){
                if (this.loaderEnabled) {
                    this.switchLoadingState(true)
                    this.options.promiseResolver({
                        close: this.close,
                        loading: this.switchLoadingState
                    })
                } else {
                    this.options.promiseResolver(true)
                    this.close()
                }
            },
            cancel(){
                if (this.loading === true)
                    return
                this.canceled = true
                this.close()
            },
            switchLoadingState(loading = null){
                if(loading === null){
                    loading = !this.loading
                }

                this.loading = !!loading
            },
            close(){
                this.show = false
            },
            anmiationEnded(){
                if (this.canceled){
                    this.options.promiseRejecter(false)
                }
                this.$emit('close')
            }
        },
        components: {CancelBtn, OkBtn}
    }
</script>

<style>
    @import '../styles/_animations.css';
    @import '../styles/default.css';
</style>
