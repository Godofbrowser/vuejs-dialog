<template>
  <div>
    <dialog-window v-for="dialog in dialogsARR"
                   :options="dialog"
                   :key="dialog.id"
                   :escapeKeyClose="dialog.escapeKeyClose"
                   :registeredViews="registeredViews"
                   @close="destroyDialog">
    </dialog-window>
  </div>
</template>

<script lang="ts">
import DialogWindow from './DialogWindow.vue'
// import {firstIndex} from '../js/utilities'
import {defineProps, defineComponent} from "vue";

defineProps<{
  msg: string
}>()

defineComponent({
  setup() {},
  components: {
    DialogWindow
  }
})
</script>

<style lang="scss">
@import '../styles/main';
</style>
