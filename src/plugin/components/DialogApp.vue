<template>
  <div>
    <DialogWindow v-for="dialog in dialogsARR"
                   :options="dialog"
                   :key="dialog.id"
                   :escapeKeyClose="dialog.escapeKeyClose"
                   :registeredViews="registeredViews"
                   @close="destroyDialog">
    </DialogWindow>
  </div>
</template>

<script lang="ts">
import DialogWindow from './DialogWindow.vue'
import {firstIndex} from '../utilities'
import {defineComponent} from "vue";

const deleteByIndex = (arr, idx) => arr.filter(i => i !== idx);

export default defineComponent({
  data: function () {
    return {
      dialogsARR: [],
      registeredViews: {}
    }
  },
  created() {
    document.addEventListener('keydown', this.escapeKeyListener)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.escapeKeyListener)
  },
  watch: {
    'dialogsARR': {
      handler (dialogs) {
        let clsName = 'dg-open'
        const body = document.getElementsByTagName('body')[0]

        if (!body) {
          return
        }

        if (dialogs.length && !body.classList.contains(clsName)) {
          body.classList.add(clsName)
        } else if (!dialogs.length && body && body.classList.contains(clsName)) {
          body.classList.remove(clsName)
        }
      }
    }
  },
  methods: {
    commit(data){
      console.log('#'.repeat(45), ' data: ', data)
      data.escapeKeyClose = false
      this.dialogsARR.push(data)
    },
    forceCloseAll() {
      this.dialogsARR.forEach((d, idx) => {
        // this.$delete(this.dialogsARR, idx)
        this.dialogsARR = deleteByIndex(this.dialogsARR, idx)
      })
    },
    destroyDialog(dialogId){
      let dialogIndex = firstIndex(this.dialogsARR, dialogId, 'id')

      if (dialogIndex !== -1) {
        // this.$delete(this.dialogsARR, dialogIndex)
        this.dialogsARR = deleteByIndex(this.dialogsARR, dialogIndex)
      }
    },
    escapeKeyListener(e){
      if (e.keyCode !== 27) return

      let dialogIndex = (-1 + this.dialogsARR.length)

      if(dialogIndex > -1){
        // this.$set(this.dialogsARR[dialogIndex], 'escapeKeyClose', true)
        this.dialogsARR[dialogIndex]['escapeKeyClose'] = true;
      }
    }
  },
  components: {DialogWindow}
})
</script>

<style lang="scss">
@import '../styles/main';
</style>
