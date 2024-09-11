<template>
  <div class="index">
    <h1 style="text-align: center;margin-bottom: 35px;margin-top: 35px;">Index page</h1>
    <div style="width: 100%;display: grid; grid-gap: 15px; grid-template-columns: repeat(auto-fill, 200px);justify-content: center">
      <button class="dg-btn" @click="testBtnHandler('alert')">Alert</button>
      <button class="dg-btn" @click="testBtnHandler('confirm')">Confirm</button>
      <button class="dg-btn" @click="testBtnHandler('prompt')">Prompt</button>
      <button class="dg-btn" @click="testBtnHandler('soft')">Confirm | soft</button>
      <button class="dg-btn" @click="testBtnHandler('loading')">Confirm | loading</button>
      <button class="dg-btn" @click="testBtnHandler('hard')">Confirm | hard</button>

    </div>
    <hr style="margin: 35px 0;" />
    <div style="width: 100%;display: grid; grid-gap: 15px; grid-template-columns: repeat(auto-fill, 200px);justify-content: center">
      <div><button class="dg-btn" v-confirm="'Please confirm!'">Directive</button></div>
      <div><a href="https://example.com" v-confirm:soft="'Visit external link?'">Example website</a></div>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    testBtnHandler(type: 'alert' | 'confirm' | 'loading' | 'prompt' | 'soft' | 'hard') {
      console.log('Clicked on the button! - ', type)
      this[type]();
    },
    alert() {
      this.$dialog.alert({
        title: 'Request failed',
        body: 'The requested resource is no longer available. It may have been moved or deleted',
      }, {
        okText: 'Dismiss'
      })
    },
    confirm() {
      this.$dialog.confirm('If you delete this record, it\'ll be gone forever.')
    },
    soft() {
      this.$dialog.confirm({
        title: "Confirm Delete",
        body: 'If you delete this record, it\'ll be gone forever.',
      }, {
        type: 'soft',
        animation: 'bounce',
      })
    },
    hard() {
      this.$dialog.confirm('If you delete this record, it\'ll be gone forever.', {
        type: 'hard'
      })
    },
    loading() {
      this.$dialog.confirm('If you delete this record, it\'ll be gone forever.', {
        loader: true
      }).then((context) => {
        if (context.canceled) return
        setTimeout(() => {
          console.log('Loading action completed ');
          context.close();
        }, 2500);
      })
    },
    prompt() {
      this.$dialog
          .prompt({
            title: "Let's hear from you",
            body: "What is the most important thing in life?",
          }, {
            promptHelp: 'Type in the box below and click "[+:okText]"',
            loader: true,
          })
          .then(context => {
            // Triggered when dialog is dismissed
            if (context.canceled) return

            setTimeout(() => {
              context.close();
              // Show an alert with the user's input as the message
              this.$dialog.alert(context.data || '[empty]')
            }, 2500);
          })
    },
  },
})

</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .index {
    max-width: 700px;
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
