<template>
  <UIExamplesButton @click="openDialog">Show prompt</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'
  import {injectionKey} from "../../../src/plugin/index.ts";

  defineOptions({
    name: "FeaturesExamplePrompt"
  })

  const $dialog = inject(injectionKey)
  const openDialog = () => $dialog.prompt({
    title: 'Prompt Example',
    body: 'What is the most important thing in life?',
  }, {
    cancelText: 'Dismiss',
    okText: 'Done',
    promptHelp: 'Type in the box below and click "[+:okText]"'
  }).then(result => {
    if (result.canceled) return;
    $dialog.alert(JSON.stringify(result))
  })
</script>
