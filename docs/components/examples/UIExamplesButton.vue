<template>
<button @click="$emit('click')"><slot></slot></button>
</template>

<script setup>
defineEmits({
  click: () => true,
})

defineOptions({
  name: "UIExamplesButton"
})
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  position: relative;
  min-width: 80px;
  padding: 6px 20px;
  border-radius: 4px;
  outline: 0;
  border: 2px solid transparent;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 16px;
  font-weight: 700;

  color: white;
  background-color: var(--vp-c-accent);
}
</style>
