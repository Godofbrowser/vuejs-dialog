<template>
  <div class="index">
    <h1 style="text-align: center;margin-bottom: 35px;margin-top: 35px;">Comp page</h1>

    <button class="dg-btn" @click="openDialog()">Open from setup</button>
    <div></div>
    <div>To see how many seconds have elapsed, click <a href="javascript:" v-confirm="`${secondsElapsed} Seconds`">here</a></div>
  </div>
</template>

<script lang="ts" setup>
import {inject, ref} from "vue";
import { injectionKey } from "@/plugin/promise.dialog";

const $dialog = inject(injectionKey)
const secondsElapsed = ref(0)
const tick = () => {
  secondsElapsed.value += 1
  setTimeout(() => tick(), 1000)
}
tick()

const openDialog = () => {
  if (!$dialog) return
  $dialog.prompt({
    title: 'Prompt Example',
    body: 'What is the most important thing in life?',
  }, {
    cancelText: 'Dismiss',
    okText: 'Submit',
    promptHelp: 'Type in the box below and click "[+:okText]"'
  }).then(result => {
    console.log({ result })
  })
}
</script>

<style>
@media (min-width: 1024px) {
  .index {
    max-width: 700px;
  }
}
</style>
