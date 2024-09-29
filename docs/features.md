# Basic Features

[[toc]]

## Alert
An alert dialog can be triggered using the `$dialog.alert()` method. This method returns a promise which resolves when the dialog is dismissed.

<UIExamplesWrapper><FeaturesExampleAlert /></UIExamplesWrapper>
@[code](components/examples/FeaturesExampleAlert.vue)

## Confirm
A confirm dialog can be triggered with the `$dialog.confirm()` method. Like the alert dialog, this method returns a promise which resolves when the dialog is dismissed.
In this section we shall explore how to create a basic confirm dialog as well as the two other variations of the confirm dialog namely; soft and hard confirmation dialogs.

### Basic confirm dialog
<UIExamplesWrapper><FeaturesExampleConfirm /></UIExamplesWrapper>
@[code](components/examples/FeaturesExampleConfirm.vue)

### Soft confirm dialog
<UIExamplesWrapper><FeaturesExampleConfirmSoft /></UIExamplesWrapper>
@[code](components/examples/FeaturesExampleConfirmSoft.vue)

### Hard confirm dialog
<UIExamplesWrapper><FeaturesExampleConfirmHard /></UIExamplesWrapper>
@[code](components/examples/FeaturesExampleConfirmHard.vue)

## Prompt
The `$dialog.prompt()` method creates a prompt dialog. Use the prompt dialog to ask user directly for input.

<UIExamplesWrapper><FeaturesExamplePrompt /></UIExamplesWrapper>
@[code](components/examples/FeaturesExamplePrompt.vue)

## Confirm directive
Add the `v-confirm` directive to any element to instantly cause it to trigger a confirm dialog. This dialog upon confirmation will trigger the default action or the provided callback when available.

<UIExamplesWrapper><FeaturesExampleDirective /></UIExamplesWrapper>
@[code](components/examples/FeaturesExampleDirective.vue)
