<template>
  <div class="examples-wrapper"><slot></slot></div>
</template>

<style lang="scss">
  h1, h2, h3, h4 {
    ~ .examples-wrapper {
      margin-top: 0.75rem;
    }
  }
</style>

<style lang="scss">
.examples-wrapper {
  border: 1px solid var(--vp-c-gutter);
  padding: 1rem;
  border-radius: 4px;
}
</style>
