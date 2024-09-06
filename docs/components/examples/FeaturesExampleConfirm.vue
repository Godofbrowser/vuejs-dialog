<template>
  <UIExamplesButton @click="openDialog">Show confirm | basic</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'

  defineOptions({
    name: "FeaturesExampleConfirm"
  })

  const $dialog = inject('$dialog')
  const openDialog = () => $dialog.confirm({
    title: 'Confirm example',
    body: 'The requested resource is no longer available. It may have been moved or deleted',
  }, {
    cancelText: 'No',
    okText: 'Yes'
  })
</script>
