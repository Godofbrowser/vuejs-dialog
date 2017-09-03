<template>
    <div>
        <dialog-window v-for="(dialog, idx) in dialogs"
                   :key="dialog.id"
                   :options="dialog.options"
                   @close="closeDialog(idx)">
        </dialog-window>
    </div>
</template>

<script>
    import DialogWindow from './dialog-window.vue'

    export default {
        data: function () {
            return {
                dialogs: []
            }
        },
        methods: {
            commit(data){
                this.dialogs.push({
                    id: data.id || Date.now(),
                    options: data
                })
            },
            closeDialog(idx){
                this.dialogs.splice(idx, 1)
            }
        },
        components: {DialogWindow}
    }
</script>
