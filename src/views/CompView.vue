<template>
  <div class="index">
    <h1 style="text-align: center;margin-bottom: 35px;margin-top: 35px;">Comp page</h1>

  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

const dialog = inject('$dialog')
const openDialog = () => dialog.alert('Hello world!')
</script>

<style>
@media (min-width: 1024px) {
  .index {
    max-width: 700px;
  }
}
</style>
