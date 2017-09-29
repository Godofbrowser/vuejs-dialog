<template>
    <div>
        <dialog-window v-for="dialog in dialogsARR"
                       :options="dialog"
                       :key="dialog.id"
                       @close="closeDialog">
        </dialog-window>
    </div>
</template>

<script>
    import DialogWindow from './dialog-window.vue'

    export default {
        data: function () {
            return {
                dialogsARR: []
            }
        },
        methods: {
            commit(data){
                this.dialogsARR.push(data)
            },
            closeDialog(dialogId){
                let dialogIndex = null
                for(let i=0; i < this.dialogsARR.length; i++){
                    if(this.dialogsARR[i].id === dialogId){
                        dialogIndex = i
                        break
                    }
                }

                if(dialogIndex !== null) {
                    this.$delete(this.dialogsARR, dialogIndex)
                }
            }
        },
        components: {DialogWindow}
    }
</script>
