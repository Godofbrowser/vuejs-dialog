<template>
  <button v-if="props.visible" :class="['dg-btn', 'dg-btn--cancel', {'dg-pull-right': props.options.reverse}]"
          @click.prevent="$emit('click')" :ref="btnRef">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

defineOptions({
  name: "CancelButton"
})

defineEmits({
  click: () => true
})

const props = defineProps({
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
})

const btnRef = ref<HTMLButtonElement>(undefined)

onMounted(() => {
  props.focus && btnRef.value.focus()
})
</script>
