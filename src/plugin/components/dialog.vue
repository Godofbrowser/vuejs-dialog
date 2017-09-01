<template>
    <div>
        <component v-for="(dialog, idx) in dialogs"
                   :key="dialog.id"
                   :is="dialog.type+ '-view'"
                   :options="dialog.options"
                   @close="closeDialog(idx)">
        </component>
    </div>
</template>

<script>
    import ConfirmDialog from './confirm.vue'
    import {DEFAULT_OPTIONS, TYPES} from '../js/utilities/constants'

    export default {
        data: function () {
            return {
                dialogs: []
            }
        },
        methods: {
            commit(data = DEFAULT_OPTIONS){
                this.dialogs.push({
                    type: data.type,
                    id: data.id || Date.now(),
                    options: data
                })
            },
            closeDialog(idx){
                this.dialogs.splice(idx, 1)
            }
        },
        components: {'confirm-view': ConfirmDialog}
    }
</script>
