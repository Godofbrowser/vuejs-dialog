# Getting started

[[toc]]

Vuejs-dialog is a vue plugin that's designed to serve as a replacement to the native confirm and alert that ships with the browser. The it is lightweight and comes with a simple api, yet very customizable and extendable.

## Installation

### Package manager
<CodeGroup>
  <CodeGroupItem title="pnpm">

```shell title="installation via pnpm"
pnpm add vuejs-dialog@next
```

  </CodeGroupItem>

  <CodeGroupItem title="yarn">

```shell title="installation via yarn"
yarn add vuejs-dialog@next
```

  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash{2} title="installation via npm"
npm i -S vuejs-dialog@next
```

  </CodeGroupItem>
</CodeGroup>


```js title="main.js"
// import into the project's entry file
import { createApp } from 'vue';
import VuejsDialog from 'vuejs-dialog';
import AppComponent from './App.vue'

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Create the app instance
const app = createApp(AppComponent)

// Install the plugin for the app instance.
app.use(VuejsDialog);

// Mount the application on the dom element with id="app"
app.mount('#app')
```

### Script tag

View it on [jsfiddle](https://jsfiddle.net/godofbrowser/rhxkz14f/3/)

```html
<head>
    <!--// Include vuejs-->
    <link href="https://unpkg.com/vuejs-dialog@next/dist/vuejs-dialog.min.css" rel="stylesheet">
    <script src="https://unpkg.com/vue@3.5.4/dist/vue.global.js"></script>
    <script src="https://unpkg.com/vuejs-dialog@next/dist/vuejs-dialog.umd.js"></script>
</head>
<body>
    <div id="app">
        <button @click="$dialog.alert(message)">
            {{ message }}
        </button>
    </div>
    <script>
        // Create Vue 3 app
        const app = window.Vue.createApp({
            data() {
                return {
                    message: 'Hello Vue 3!',
                };
            },
        });

        app.use(window.VuejsDialog.PromiseDialog, {
            animation: 'bounce'
        })

        // Mount the app to the DOM element
        app.mount('#app');
    </script>
</body>


```

## Opening a dialog

### Options API
```vue title="App.vue"
<template>
    <button @click="openDialog">Open dialog</button>
</template>
<script>
export default {
    methods: {
        openDialog() {
            this.$dialog.alert('Hello world!')
        }
    }
}
</script>
```

### Composition API
```vue title="App.vue"
<template>
    <button @click="openDialog">Open dialog</button>
</template>
<script setup>
    import {inject} from "vue";
    const $dialog = inject(Symbol.for('$dialog'))
    const openDialog = () => $dialog.alert('Hello world!')
</script>
```

### Directives API
```vue title="App.vue"
<template>
    <button v-confirm="'Hello world!'">Open dialog</button>
</template>
```

## Typescript support

Typescript is supported out of the box using (SFC: be sure to add the `lang="ts"` to your script tag):

- The provide/inject pattern for the composition API `const $dialog = inject(injectionKey)`
- Type augmentation for the options API `this.$dialog.alert('Hello!')`
- Type augmentation for the directives API `v-confirm="'Hello!'"`


::: info
You may want to look at the [module resolution option](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#--moduleresolution-bundler) (introduced in Typescript 5.0) if you are experiencing [issues](https://stackoverflow.com/questions/75870063/vscode-and-typescript-5-moduleresolution-bundler) with typescript especially if your config is set to "bundler"
:::
