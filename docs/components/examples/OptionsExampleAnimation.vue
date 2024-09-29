<template>
  <UIExamplesButton @click="openDialog('zoom')">Zoom</UIExamplesButton>&nbsp;
  <UIExamplesButton @click="openDialog('fade')">Fade</UIExamplesButton>&nbsp;
  <UIExamplesButton @click="openDialog('bounce')">Bounce</UIExamplesButton>
</template>

<script setup>
  import {inject} from 'vue'
  import {injectionKey} from "../../../src/plugin/index.ts";

  defineOptions({
    name: "OptionsExampleAnimation"
  })

  const $dialog = inject(injectionKey)
  const openDialog = (animation) => $dialog.alert({
    title: 'Alert example',
    body: 'Session expired. Please login again to continue.',
  }, {
    okText: 'Dismiss',
    animation,
    backdropClose: true,
  })
</script>
