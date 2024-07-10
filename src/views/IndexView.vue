<template>
  <div class="index">
    <h1>Index page</h1>
    <button class="dg-btn" @click="testBtnHandler()">Click</button>
  </div>
</template>

<script>
export default {
  methods: {
    testBtnHandler() {
      console.log('Clicked on the button!', this.$dialog)
      this.$dialog.confirm('Are you sure?')
    }
  }
}

</script>

<style>
@media (min-width: 1024px) {
  .index {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .dg-btn {
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
  }
}
</style>
