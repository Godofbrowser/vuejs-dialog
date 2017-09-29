<template>
    <div>
        <dialog-window v-for="dialog in dialogs"
                       :options="dialog"
                       :key="dialog.id"
                       @close="closeDialog">
        </dialog-window>
    </div>
</template>

<script>
    import Vue from 'vue'
    import DialogWindow from './dialog-window.vue'

    export default {
        data: function () {
            return {
                dialogsOBJ: {}
            }
        },
        computed: {
            dialogs(){
                let ret = []
                for(let dialog in this.dialogsOBJ){
                    if(this.dialogsOBJ.hasOwnProperty(dialog)){
                        console.log("Computed: ", dialog, this.dialogsOBJ[dialog])
                        ret.push(this.dialogsOBJ[dialog])
                    }
                }
                return ret
            }
        },
        methods: {
            commit(data){
                this.$set(this.dialogsOBJ, data.id, data)
            },
            closeDialog(id){
                console.log(id)

                this.$delete(this.dialogsOBJ, id)

                console.log(this.dialogs.length, this.dialogs)

            }
        },
        components: {DialogWindow}
    }
</script>
