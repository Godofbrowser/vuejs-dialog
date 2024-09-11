<template>
  <UIExamplesButton @click="openDialog">Show confirm | basic</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'
  import {injectionKey} from "../../../src/plugin/index.ts";

  defineOptions({
    name: "FeaturesExampleConfirm"
  })

  const $dialog = inject(injectionKey)
  const openDialog = () => $dialog.confirm({
    title: 'Confirm example',
    body: 'The is a low risk operation. Single click required to confirm.',
  }, {
    cancelText: 'No',
    okText: 'Yes'
  })
</script>
