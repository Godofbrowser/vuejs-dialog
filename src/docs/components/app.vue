<template>
    <div style="max-width: 350px; margin:auto; font-family: 'Noto Sans', sans-serif; text-align: center">
        <h1 class="page-title">Vuejs-Dialog Plugin Examples</h1>

        <section>
            <h2>Usage as a method</h2>
            <hr/>
            <h4>
                <button @click="showAlertDialog()">Alert Dialog - one button</button>
            </h4>

            <h4>
                <button @click="showHtmlDialog()">Html Dialog - style/format content</button>
            </h4>

            <h4>
                <button @click="showBasicDialog()">Basic confirm - close instantly</button>
            </h4>

            <h4>
                <button @click="showLoadingDialog()">Loading Dialog - Useful with ajax</button>
            </h4>

            <h4>
                <button @click="showReversedDialog()">Reversed Dialog - switch buttons</button>
            </h4>

            <h4>
                <button @click="showAnimationFadeDialog()">Fade Dialog - Animation</button>
            </h4>

            <h4>
                <button @click="showAnimationBounceDialog()">Bounce Dialog - Animation</button>
            </h4>
        </section>

        <section>
            <h2>Usage as a directive</h2>
            <hr/>

            <h4>
                <a href="http://example.com" v-confirm="'This will take you to http://example.com. Proceed with caution'">Go to example.com</a>
            </h4>

            <h4>
                <button v-confirm="`This is a message`">
                    Give it a string v-confirm="This is a message"
                </button>
            </h4>

            <h4>
                <button v-confirm="{
                message: 'This dialog was also triggered using a v-confirm directive. It has both OK and CANCEL callback',
                 ok: clickOkHandler,
                 cancel: clickCancelHandler}"
                >
                    Give it an object v-confirm="messageAndCallback"
                </button>
            </h4>

            <h4>
                <form @submit.prevent="submitDemo1Form()">
                    <fieldset>
                        <input v-model="forms.demo1.name" type="text" name="name" placeholder="Your name"/>
                        <button type="reset" v-confirm="'Changes would be discarded. Reset this form?'">Reset</button>
                        <button type="submit" v-confirm="'Submit this form?'">submit</button>
                    </fieldset>
                </form>
            </h4>
        </section>


        <section>
            <h2>Confirmation types</h2>
            <hr/>

            <p>All dialogs used above are BASIC confirmation dialogs. There are more strict dialogs available.</p>
            <p> SOFT and HARD confirmation dialogs. Examples below:</p>

            <h4>
                <button @click="showSoftConfirmDialog()">Soft confirm - multiple clicks required</button>
            </h4>
        </section>

        <notifications position="bottom left"></notifications>
    </div>
</template>

<script>
    import trans from '../js/translations'

    export default {
        data(){
            return {
                forms: {
                    demo1: {
                        name: null
                    }
                }
            }
        },
        mounted(){
            console.log('mounted app')
        },
        methods: {
            submitDemo1Form(){
                let msg = "Form Submited. Your Name: "
                msg += this.forms.demo1.name || 'The name field is empty'
                this.$notify(msg)
            },
            showAlertDialog(){
                this.$dialog.alert(trans('messages.alert'))
            },
            showBasicDialog(){
                this.$dialog.confirm(trans('messages.basic'))
                    .then(() => {
                        this.$notify({type: 'success', text: trans('messages.click_continue')})
                    })
                    .catch(() => {
                        this.$notify({type: 'success', text: trans('messages.click_cancel')})
                    })
            },
            showSoftConfirmDialog(){
                this.$dialog.confirm(trans('messages.soft'), {type: 'soft'})
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
            showAnimationBounceDialog(){
                this.$dialog.alert(trans('messages.html'), {html: true, animation: 'bounce'})
            },
            showAnimationFadeDialog(){
                this.$dialog.alert(trans('messages.html'), {html: true, animation: 'fade'})
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
            },
            clickOkHandler(){
                this.$notify({type: 'success', text: trans('messages.click_continue')})
            },
            clickCancelHandler(){
                this.$notify({type: 'error', text: trans('messages.click_cancel')})
            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/app.scss";

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