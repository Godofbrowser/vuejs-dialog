<template>
    <div style="max-width: 350px; margin:auto; font-family: 'Noto Sans', sans-serif; text-align: center">
        <h1>Vuejs-Dialog Plugin Examples</h1>

        <h3>
            <button @click="showAlertDialog()">Alert Dialog - one button</button>
        </h3>

        <h3>
            <button @click="showHtmlDialog()">Html Dialog - style/format content</button>
        </h3>

        <h3>
            <button @click="showBasicDialog()">Basic confirm - close instantly</button>
        </h3>

        <h3>
            <button @click="showLoadingDialog()">Loading Dialog - Useful with ajax</button>
        </h3>

        <h3>
            <button @click="showReversedDialog()">Reversed Dialog - switch buttons</button>
        </h3>



        <notifications position="bottom left"></notifications>
    </div>
</template>

<script>
    import trans from '../js/translations'

    export default {
        mounted(){
            console.log('mounted app')
        },
        methods: {
            showAlertDialog(){
                this.$dialog.alert(trans('messages.alert'))
            },

            async showBasicDialog(){
                this.$dialog.confirm(trans('messages.basic'))
                    .then(() => {
                        this.$notify({type: 'success', text: trans('messages.click_continue')})
                    })
                    .catch(() => {
                        this.$notify({type: 'success', text: trans('messages.click_cancel')})
                    })
            },
            showHtmlDialog(){
                this.$dialog.alert(trans('messages.html'), {html: true, okText: 'Dismiss'})
            },

            showLoadingDialog(item = 'foo'){
                this.$dialog.confirm(trans('messages.loading'), {
                    html: true,
                    okText: 'Proceed',
                    loader: true
                }).then((dialog) => {
                    setTimeout(() => {
                        this.$notify({type: 'success', text: trans('messages.loading_completed')})
                        dialog.close()
                    }, 2500)

                }).catch(() => {
                    this.$notify({text: trans('messages.loading_canceled')})
                })
            },

            showReversedDialog(){
                this.$dialog.confirm(trans('messages.reverse'), {
                    html: true,
                    okText: 'Proceed',
                    loader: true,
                    reverse: true
                }).then((dialog) => {
                    setTimeout(() => {
                        this.$notify({type: 'success', text: trans('messages.loading_completed')})
                        dialog.close()
                    }, 2500)

                }).catch(() => {
                    this.$notify({text: trans('messages.loading_canceled')})
                })
            }
        }
    }
</script>

<style>
    .vue-notification {
        padding: 10px;
        margin: 15px;

        font-size: 18px;
        font-family: "Noto Sans", sans-serif;

        color: #ffffff;
        background: #44A4FC;
        border-left: 5px solid #187FE7;
    }
</style>