<template>
  <button v-if="visible" :class="['dg-btn', 'dg-btn--ok', {'dg-btn--loading': loading}, {'dg-pull-right': !options.reverse}]"
          @click.prevent="proceed()" ref="btn" :disabled="disabled">
        <span class="dg-btn-content">
            <slot></slot>
            <span v-if="soft_confirm">({{ clicks_remaining }})</span>
        </span>
    <component :is="'BtnLoader'" v-if="loading"></component>
  </button>
</template>

<script lang="ts">
import BtnLoader from './ButtonLoader.vue'
import {defineComponent, PropType} from "vue";
import {CONFIRM_TYPES} from "../constants.ts";
import {ButtonStateInterface, DialogWindowOptions} from "../../plugin/interface.ts";

export default defineComponent({
  name: "OkButton",
  data(){
    return {
      clicks_count: 0
    }
  },
  emits: {
    click: () => true,
  },
  props: {
    visible: {
      required: false,
      type: Boolean,
      'default': true
    },
    options: {
      required: true,
      type: Object as PropType<DialogWindowOptions>,
    },
    focus: {
      required: false,
      type: Boolean,
      'default': false
    },
    loading: {
      required: false,
      type: Boolean,
      'default': false
    },
    btnState: {
      required: true,
      type: Object as PropType<ButtonStateInterface>,
      'default': {
        disabled: true,
        visible: true,
      }
    }
  },
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
    disabled(){
      return this.btnState.disabled
    },
    clicks_remaining(){
      return Math.max((this.options.clicksCount - this.clicks_count), 0)
    }
  },
  methods: {
    proceed(){
      if(!this.disabled && this.validateProceed()){
        this.$emit('click')
      }
    },
    validateProceed(){
      switch (this.options.type){
        case CONFIRM_TYPES.SOFT:
          this.clicks_count++
          return (this.clicks_count >= this.options.clicksCount)
        case CONFIRM_TYPES.BASIC:
        default:
          return true;
      }
    },
  },
  components: {BtnLoader}
})
</script>

<style scoped>

</style>
