<template>
  <div>
    <DialogWindow v-for="dialog in dialogsARR"
                   :options="dialog"
                   :id="dialog.id"
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
import {DialogWindowOptions} from "@/plugin/interface";

const deleteByIndex = (arr, idx) => arr.filter((_, i) => i !== idx);

export default defineComponent({
  data: function () {
    return {
      dialogsARR: [] as (DialogWindowOptions & {
        id: string;
        escapeKeyClose: boolean;
      })[],
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
    commit(data: DialogWindowOptions){
      const id = 'dialog.' + Date.now()
      this.dialogsARR.push({...data, id, escapeKeyClose: false})
      return id
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
        // Necessary for macOS Fullscreen mode,
        // else the browser exits fullscreen.
        // However, we only do this if total open dialog is > 0.
        e.preventDefault();

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
