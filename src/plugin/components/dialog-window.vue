<template>
    <div :class="customClass.rootClass">
        <transition name="dg-backdrop" appear @after-leave="animationEnded('backdrop')">
            <div v-if="show" class="dg-backdrop"></div>
        </transition>

        <transition :name="animation" @after-leave="animationEnded('content')" appear>
            <div v-if="show" :class="['dg-container', customClass.containerClass, {'dg-container--has-input': (isHardConfirm || isPrompt)}]" @click="closeAtOutsideClick" >
                <div :class="['dg-content-cont', 'dg-content-cont--floating', customClass.contentClass]">
                    <div :class="['dg-main-content', customClass.mainContent]" @click.stop>
                        <component :is="dialogView" :options="options" @close="close"></component>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import DefaultView from './views/default-view.vue'
    import {DIALOG_TYPES, ANIMATION_TYPES, CONFIRM_TYPES, CUSTOM_CLASS} from '../js/constants'

    export default {
        data: function () {
            return {
                show: true,
                closed: false,
                endedAnimations: [],
                customClass: Object.assign({}, CUSTOM_CLASS),
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
            },
            setCustomClasses(){
                if (this.options.hasOwnProperty('customClass')) {
                    Object.keys(this.options.customClass).forEach(prop => {
                        if (!Object.keys(CUSTOM_CLASS).includes(prop)) {
                            console.warn(`[WARNING]: Custom class name "${prop}" could not be found!`)
            }
                    });
                }
                this.customClass = Object.assign(this.customClass, this.options.customClass);
            }
        },
        mounted () {
            this.setCustomClasses()
        },
        beforeDestroy(){
            if(this.closed === false){
                this.cancelBtnDisabled ? this.proceed() : this.cancel()
            }
        }
    }
</script>
