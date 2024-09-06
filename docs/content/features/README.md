# Features

## Alert
An alert dialog can be triggered using the `$dialog.alert()` method. This method returns a promise which resolves when the dialog is dismissed.

<FeaturesExampleAlert />
@[code](../../components/examples/FeaturesExampleAlert.vue)



## Confirm
A confirm dialog can be triggered with the `$dialog.confirm()` method. Like the alert dialog, this method returns a promise which resolves when the dialog is dismissed.
In this section we shall explore how to create a basic confirm dialog as well as the two other variations of the confirm dialog namely; soft and hard confirmation dialogs.


### Basic confirm dialog


<FeaturesExampleConfirm />
@[code](../../components/examples/FeaturesExampleConfirm.vue)


### Soft confirm dialog
<FeaturesExampleConfirmSoft />
@[code](../../components/examples/FeaturesExampleConfirmSoft.vue)


### Hard confirm dialog
<FeaturesExampleConfirmHard />
@[code](../../components/examples/FeaturesExampleConfirmHard.vue)


## Prompt
The `$dialog.prompt()` method creates a prompt dialog. Use the prompt dialog to ask user directly for input.

<FeaturesExamplePrompt />
@[code](../../components/examples/FeaturesExamplePrompt.vue)


## Confirm directive
Sample code block
```ts title=".vuepress/config.ts"
this.$dialog.alert({
    title: 'Request failed',
    body: 'The requested resource is no longer available. It may have been moved or deleted',
}, {
    okText: 'Dismiss'
})
```
