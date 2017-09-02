<template>
    <div>
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


                            <button v-if="cancelBtnEnabled" ref="cancelBtn" class="dg-btn dg-btn--left"
                                    @click.prevent="clickLeftBtn()">{{ options.cancelText}}
                            </button>

                            <button @click.prevent="clickRightBtn()"
                                    ref="okBtn"
                                    :class="['dg-btn', 'dg-btn--right', {'dg-btn--loading': loading}]">

                                <span class="dg-btn-content">{{ options.okText }}</span>
                                <span is="btn-loader" v-if="loading"></span>
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
    import BtnLoader from './btn-loader.vue'
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
        mounted(){
            if (this.cancelBtnEnabled) {
                this.$refs['cancelBtn'].focus()
            } else {
                this.$refs['okBtn'].focus()
            }
        },
        computed: {
            loaderEnabled(){
                return !!this.options.loader
            },
            cancelBtnEnabled(){
                return this.options.window !== DIALOG_TYPES.ALERT
            }
        },
        methods: {
            clickRightBtn(){
                this.proceed()
            },
            clickLeftBtn(){
                this.cancel()
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
        components: {BtnLoader}
    }
</script>

<style>
    @import '../styles/_animations.css';
    @import '../styles/default.css';
</style>
