<template>
  <UIExamplesButton @click="openDialog">Show confirm | hard</UIExamplesButton>
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
    body: 'The requested resource is no longer available. It may have been moved or deleted',
  }, {
    cancelText: 'No',
    okText: 'Yes',
    type: 'hard'
  })
</script>
