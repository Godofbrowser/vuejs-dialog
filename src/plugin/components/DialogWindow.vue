<template>
  <div>
    <transition name="dg-backdrop" appear @after-leave="animationEnded('backdrop')">
      <div v-if="show" class="dg-backdrop" />
    </transition>

    <transition :name="animation" @after-leave="animationEnded('content')" appear>
      <div v-if="show"
           @click="closeAtOutsideClick"
           :class="['dg-container', {'dg-container--has-input': (isHardConfirm || isPrompt)}]"
      >
        <div class="dg-content-cont dg-content-cont--floating">
          <div class="dg-main-content"
               :class="customClass.mainContent"
               @click.stop
          >
            <div :class="['dg-content-body', customClass.body, {'dg-content-body--has-title': messageHasTitle}]">
              <template v-if="messageHasTitle">
                <h6 v-if="options.html" class="dg-title" v-html="messageTitle"></h6>
                <h6 v-else class="dg-title">{{ messageTitle }}</h6>
              </template>

              <div v-if="options.html" class="dg-content" v-html="messageBody"></div>
              <div v-else class="dg-content">{{ messageBody }}</div>

              <form v-if="isHardConfirm || isPrompt"
                    class="dg-form"
                    autocomplete="off"
                    @submit.prevent="submitDialogForm"
              >
                <label for="dg-input-elem" style="font-size: 13px">{{ isPrompt ? promptHelpText : hardConfirmHelpText }}</label>
                <input type="text"
                       :placeholder="isPrompt ? '' : options.verification"
                       v-model="input"
                       autocomplete="off"
                       id="dg-input-elem"
                       ref="inputElem"
                       style="width: 100%;margin-top: 10px;
                            padding: 5px 15px; font-size: 16px;
                            border-radius: 4px; border: 2px solid #eee"
                />
              </form>
            </div>

            <div class="dg-content-footer" :class="customClass.footer">
              <component @click="clickLeftBtn()"
                      :is="leftBtnComponent"
                      :btn-state="leftBtnState"
                      :loading="loading"
                      :class="customClass.cancel"
                      :visible="leftBtnVisible"
                      :options="options"
                      :focus="leftBtnFocus"
              >
                <span v-if="options.html" v-html="leftBtnText"></span>
                <span v-else>{{ leftBtnText }}</span>
              </component>

              <component @click="clickRightBtn()"
                      :is="rightBtnState.component"
                      :btn-state="rightBtnState"
                      :loading="loading"
                      :class="customClass.ok"
                      :visible="rightBtnVisible"
                      :options="options"
                      :focus="rightBtnFocus"
              >
                <span v-if="options.html" v-html="rightBtnText"></span>
                <span v-else>{{ rightBtnText }}</span>
              </component>

              <div class="dg-clear"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import OkBtn from './OkButton.vue';
import CancelBtn from './CancelButton.vue';
import {
  ANIMATION_TYPES,
  CONFIRM_TYPES,
  DIALOG_TYPES,
  CUSTOM_CLASS
} from "../constants";
import type {ButtonStateInterface} from "@/plugin/interface";
// import {MessageMixin} from "@/plugin/mixins/MessageMixin";
// import {ButtonMixin} from "@/plugin/mixins/ButtonMixin";

export default defineComponent({
  name: "DialogWindow",
  data: function () {
    return {
      input: '',
      show: true,
      loading: false,
      closed: false,
      customClass: Object.assign({}, CUSTOM_CLASS),
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
    }
  },
  watch: {
    "escapeKeyClose": function(val) {
      if(val === true){
        this.cancelBtnDisabled ? this.proceed() : this.cancel()
      }
    }
  },
  computed: {
    animation(){
      let a = this.options.animation.toUpperCase()
      return Object.prototype.hasOwnProperty.call(ANIMATION_TYPES, a)
          ? ANIMATION_TYPES[a]
          : ANIMATION_TYPES.ZOOM
    },
    loaderEnabled(){
      return !!this.options.loader
    },
    isHardConfirm(){
      return this.options.window === DIALOG_TYPES.CONFIRM
          && this.options.type === CONFIRM_TYPES.HARD
    },
    isPrompt(){
      return (this.options.window === DIALOG_TYPES.PROMPT)
    },
    leftBtnComponent(){
      return (this.options.reverse === false) ? CancelBtn : OkBtn
    },
    rightBtnComponent(){
      return (this.options.reverse === true) ? CancelBtn : OkBtn
    },
    hardConfirmHelpText(){
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
    },

    // Refactored from MessageMixin
    messageHasTitle(){
      let m = this.options.message
      return (typeof m === 'object' && m !== null) && m.title
    },
    messageTitle(){
      return this.messageHasTitle ? this.options.message.title : null
    },
    messageBody(){
      return this.messageHasTitle ? this.options.message.body : this.options.message
    },
    // END - Refactored from MessageMixin

    // Refactored from ButtonMixin
    cancelBtnDisabled () {
      return (this.options.window === DIALOG_TYPES.ALERT)
    },
    okBtnDisabled () {
      return (this.options.window === DIALOG_TYPES.CONFIRM) &&
          (this.options.type === CONFIRM_TYPES.HARD) &&
          (this.input !== this.options.verification)
    },
    leftBtnVisible () {
      return (this.cancelBtnDisabled === false) || (this.options.reverse === true)
    },
    rightBtnVisible () {
      return (this.cancelBtnDisabled === false) || (this.options.reverse === false)
    },
    leftBtnFocus () {
      return !this.isHardConfirm && (this.options.reverse === true)
    },
    rightBtnFocus () {
      return !this.isHardConfirm && (this.options.reverse === false)
    },
    leftBtnText () {
      return this.options.reverse ? this.options.okText : this.options.cancelText
    },
    rightBtnText () {
      return this.options.reverse ? this.options.cancelText : this.options.okText
    },
    // END - Refactored from ButtonMixin

    btnState(): Pick<ButtonStateInterface, 'loading' | 'options'> {
      return {
        loading: this.loading,
        options: this.options,
      }
    },
    rightBtnState(): ButtonStateInterface {
      const { reverse } = this.options;
      return {
        ...this.btnState,
        component: reverse ? CancelBtn : OkBtn,
        disabled: this.okBtnDisabled,
        visible: (this.options.window !== DIALOG_TYPES.ALERT) || !reverse
      }
    },
    leftBtnState(): ButtonStateInterface {
      const { reverse } = this.options;
      return {
        ...this.btnState,
        component: !reverse ? CancelBtn : OkBtn,
        disabled: this.cancelBtnDisabled,
        visible: !this.cancelBtnDisabled || reverse,
      }
    }
  },
  mounted () {
    this.setCustomClasses()
    ;(this.isHardConfirm || this.isPrompt) && this.$refs.inputElem && this.$refs.inputElem.focus()
  },
  methods: {
    closeAtOutsideClick() {
      if (this.options.backdropClose === true) {
        this.cancel()
      }
    },
    clickRightBtn () {
      this.options.reverse ? this.cancel() : this.proceed(this.getDefaultData())
    },
    clickLeftBtn () {
      this.options.reverse ? this.proceed(this.getDefaultData()) : this.cancel()
    },
    submitDialogForm () {
      this.okBtnDisabled || this.proceed(this.getDefaultData())
    },
    getDefaultData () {
      return this.isPrompt ? this.input : null
    },
    proceed(withData = null){
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
    cancel(){
      if (this.loading === true)
        return
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
      if (Object.prototype.hasOwnProperty.call(this.options, 'customClass')) {
        Object.keys(this.options.customClass).forEach(prop => {
          if (!Object.keys(CUSTOM_CLASS).includes(prop)) {
            console.warn(`[WARNING]: Custom class name "${prop}" could not be found!`)
          }
        });
      }
      this.customClass = Object.assign(this.customClass, this.options.customClass);
    }
  },
  beforeUnmount(){
    if(this.closed === false){
      this.cancelBtnDisabled ? this.proceed() : this.cancel()
    }
  },
  // mixins: [MessageMixin, ButtonMixin],
  components: {CancelBtn, OkBtn}
})
</script>

<style scoped>

</style>
