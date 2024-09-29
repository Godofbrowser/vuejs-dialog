# Digging deeper

## Options

```typescript
declare interface DialogOptions {
    message: MessageWithTitle;
    html: boolean;
    loader: boolean;
    reverse: boolean;
    backdropClose: boolean;
    okText: string;
    cancelText: string;
    type: ConfirmTypeEnum;
    clicksCount: number;
    animation: 'zoom' | 'bounce' | 'fade';
    customClass: {
        [k: string]: string;
    };
    verification: string;
    verificationHelp: string;
    promptHelp: string;
}
```

### Animation
There are three options to choose from so you have some flexibility with how the dialog transitions into view.

<UIExamplesWrapper><OptionsExampleAnimation /></UIExamplesWrapper>
@[code](components/examples/OptionsExampleAnimation.vue)


### Loader
You may use the loader option to indicate that an asynchronous task is being performed after the user decides to proceed.
<UIExamplesWrapper><OptionsExampleLoader /></UIExamplesWrapper>
@[code](components/examples/OptionsExampleLoader.vue)




## Custom component
// Todo

