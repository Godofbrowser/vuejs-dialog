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
    body: 'The is a low risk operation. Single click required to confirm.',
  }, {
    cancelText: 'No',
    okText: 'Yes'
  })
</script>
