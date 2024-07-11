<template>
  <button v-if="visible" :class="['dg-btn', 'dg-btn--cancel', {'dg-pull-right': options.reverse}]"
          @click.prevent="$emit('click')" ref="btn">
    <slot></slot>
  </button>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CancelButton",
  props: {
    visible: {
      required: false,
      type: Boolean,
      'default': true
    },
    options: {
      required: true,
      type: Object
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
    }
  },
  mounted(){
    this.focus && this.$refs.btn.focus()
  }
})
</script>

<style scoped>

</style>
