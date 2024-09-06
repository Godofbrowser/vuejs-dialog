<template>
  <UIExamplesButton @click="openDialog">Show alert</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'

  defineOptions({
    name: "FeaturesExampleAlert"
  })

  const $dialog = inject('$dialog')
  const openDialog = () => $dialog.alert({
    title: 'Alert example',
    body: 'Session expired. Please login again to continue.',
  }, {
    okText: 'Dismiss'
  })
</script>
