<template>
  <UIExamplesButton @click="openDialog()">Show dialog</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'
  import {injectionKey} from "../../../src/plugin/index.ts";

  defineOptions({
    name: "OptionsExampleLoader"
  })

  const $dialog = inject(injectionKey)
  const openDialog = () => $dialog.confirm({
    title: 'Confirmation!',
    body: 'Delete is permanent. Do you wish to proceed?',
  }, {
    okText: 'Delete',
    loader: true,
  }).then(({ canceled, close }) => {
    if (canceled) return
    setTimeout(close, 2000)
  })
</script>
