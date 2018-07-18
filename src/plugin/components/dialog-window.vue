<template>
    <div>
        <transition name="dg-backdrop" appear @after-leave="animationEnded('backdrop')">
            <div v-if="show" class="dg-backdrop"></div>
        </transition>

        <transition :name="animation" @after-leave="animationEnded('content')" appear>
            <div v-if="show" :class="['dg-container', {'dg-container--has-input': (isHardConfirm || isPrompt)}]" @click="closeAtOutsideClick" >
                <div class="dg-content-cont dg-content-cont--floating">
                    <div class="dg-main-content" @click.stop>
                        <component :is="dialogView" :options="options" @close="close"></component>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import DefaultView from './views/default-view.vue'
    import {DIALOG_TYPES, ANIMATION_TYPES, CONFIRM_TYPES} from '../js/constants'

    export default {
        data: function () {
            return {
                show: true,
                closed: false,
                endedAnimations: []
            }
        },
        props: {
            options: {
                type: Object,
                required: true
            },
            escapeKeyClose: {
                type: Boolean,
                "default": false
            },
            registeredViews: {
                type: Object,
                'default': function () {
                    return {}
                }
            }
        },
        watch: {
            "escapeKeyClose": function(val){
                if(val === true){
                    this.cancelBtnDisabled ? this.proceed() : this.cancel()
                }
            }
        },
        computed: {
            animation(){
                let a = this.options.animation.toUpperCase()
                return ANIMATION_TYPES.hasOwnProperty(a)
                    ? ANIMATION_TYPES[a]
                    : ANIMATION_TYPES.ZOOM
            },
            loaderEnabled(){
                return !!this.options.loader
            },
            dialogView(){
                const customView = this.options.view 
                ? this.registeredViews[this.options.view] 
                : null
                return customView || DefaultView
            },
            isHardConfirm () {
                return this.options.window === DIALOG_TYPES.CONFIRM &&
                    this.options.type === CONFIRM_TYPES.HARD
            },
            isPrompt () {
                return (this.options.window === DIALOG_TYPES.PROMPT)
            },
        },
        methods: {
            closeAtOutsideClick() {
              if (this.options.backdropClose === true) {
                  this.cancelBtnDisabled ? this.proceed() : this.cancel()
              }
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
                this.close()
            },
            close(){
                this.show = false
                this.closed = true
            },
            animationEnded(type){
                this.endedAnimations.push(type)

                if(this.endedAnimations.indexOf('backdrop') !== -1
                    && this.endedAnimations.indexOf('content') !== -1
                ){
                    this.options.promiseRejecter(false)
                    this.$emit('close', this.options.id)
                }
            }
        },
        beforeDestroy(){
            if(this.closed === false){
                this.cancelBtnDisabled ? this.proceed() : this.cancel()
            }
        }
    }
</script>
