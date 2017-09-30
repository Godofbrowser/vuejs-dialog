<template>
    <div>
        <dialog-window v-for="dialog in dialogsARR"
                       :options="dialog"
                       :key="dialog.id"
                       :escapeKeyClose="dialog.escapeKeyPressed"
                       @close="destroyDialog">
        </dialog-window>
    </div>
</template>

<script>
    import DialogWindow from './dialog-window.vue'
    import {firstIndex} from '../js/utilities'

    export default {
        data: function () {
            return {
                dialogsARR: []
            }
        },
        created() {
            document.addEventListener('keydown', this.escapeKeyListener)
        },
        destroyed() {
            document.removeEventListener('keydown', this.escapeKeyListener)
        },
        methods: {
            commit(data){
                data.escapeKeyPressed = false
                this.dialogsARR.push(data)
            },
            destroyDialog(dialogId = null){
                let dialogIndex = dialogId === null
                    ? (-1 + this.dialogsARR.length)
                    : firstIndex(this.dialogsARR, dialogId, 'id')

                if (dialogIndex !== -1) {
                    this.$delete(this.dialogsARR, dialogIndex)
                }
            },
            escapeKeyListener(e){
                if (e.keyCode !== 27) return

                let dialogIndex = (-1 + this.dialogsARR.length)

                if(dialogIndex > -1){
                    this.$set(this.dialogsARR[dialogIndex], 'escapeKeyPressed', true)
                }
            }
        },
        components: {DialogWindow}
    }
</script>

<style lang="scss">
    @import '../styles/main';
</style>