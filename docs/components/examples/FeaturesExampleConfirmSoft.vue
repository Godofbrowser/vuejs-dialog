<template>
  <UIExamplesButton @click="openDialog">Show confirm | soft</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'

  defineOptions({
    name: "FeaturesExampleConfirmSoft"
  })

  const $dialog = inject('$dialog')
  const openDialog = () => $dialog.confirm({
    title: 'Soft confirm example',
    body: 'This is a medium risk action. Multiple clicks required to confirm',
  }, {
    cancelText: 'Cancel',
    okText: 'Proceed',
    clicksCount: 2,
    type: 'soft'
  })
</script>
