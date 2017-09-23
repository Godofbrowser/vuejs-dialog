<template>
    <div>
        <header>
            <div class="header-cont centered">
                <h1 class="title">Vuejs Dialog Plugin</h1>
            </div>

        </header>

        <section style="max-width: 350px; margin:auto; text-align: center">
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

        <section style="max-width: 350px; margin:auto; font-family: 'Noto Sans', sans-serif; text-align: center">
            <h2>Usage as a directive</h2>
            <hr/>

            <h4>
                <button v-confirm="`This is a message`">
                    Give it a string v-confirm="This is a message"
                </button>
            </h4>

            <h4>
                <a href="http://example.com" v-confirm="`This will take you to &quot;http://example.com&quot;. Proceed with caution`">Go to example.com</a>
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


        <section style="max-width: 350px; margin:auto; font-family: 'Noto Sans', sans-serif; text-align: center">
            <h2>Confirmation types</h2>
            <hr/>

            <p>All dialogs used above are BASIC confirmation dialogs. There are more strict dialogs available.</p>
            <p> SOFT and HARD confirmation dialogs. Examples below:</p>

            <h4>
                <button @click="showSoftConfirmDialog()">Soft confirm - multiple clicks required</button>
            </h4>

            <h4>
                <button @click="showHardConfirmDialog()">Hard confirm - verification text required</button>
            </h4>
        </section>

        <notifications position="bottom left"></notifications>

        <a href="https://github.com/godofbrowser/vuejs-dialog"
           v-confirm:soft="{html: true, message: exitMessage, cancelText: `Stay on Page`, okText: `Source Code`}">
            <img style="position: absolute; top: 0; right: 0; border: 0;"
                 src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
                 alt="Fork me on GitHub"
                 data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png">
        </a>
    </div>
</template>

<script>
    import trans from '../js/translations'

    const exitMessage = `
<p style="text-align: center; margin: 0;">
    <span class="dg-highlight-1">Thank You!</span>
     <br/>
     I hope you find it useful
</p>`

    export default {
        data(){
            return {
                exitMessage,
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
            showHardConfirmDialog(){
                this.$dialog.confirm(trans('messages.hard'), {type: 'hard', html: true, verification: 'let me go'})
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
    @import "../scss/app";

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