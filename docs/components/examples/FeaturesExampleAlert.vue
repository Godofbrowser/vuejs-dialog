<template>
  <UIExamplesButton @click="openDialog">Show alert</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'
  import {injectionKey} from "../../../src/plugin/index.ts";

  defineOptions({
    name: "FeaturesExampleAlert"
  })

  const $dialog = inject(injectionKey)
  const openDialog = () => $dialog.alert({
    title: 'Alert example',
    body: 'Session expired. Please login again to continue.',
  }, {
    okText: 'Dismiss'
  })
</script>
