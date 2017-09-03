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
            },
            escapeKeyListener: function(evt) {
                if (evt.keyCode === 27 && this.dialogs.length) {
                    this.closeDialog(this.dialogs.length - 1)
                }
            }
        },
        created() {
            document.addEventListener('keydown', this.escapeKeyListener);
        },
        destroyed() {
            document.removeEventListener('keydown', this.escapeKeyListener);
        },
        components: {DialogWindow}
    }
</script>
