# Vuejs Dialog Plugin

> A lightweight, promise based alert, prompt and confirm dialog.

[![npm version](https://badge.fury.io/js/vuejs-dialog.svg)](https://badge.fury.io/js/vuejs-dialog)
[![Build Status](https://travis-ci.org/Godofbrowser/vuejs-dialog.svg?branch=master)](https://travis-ci.org/Godofbrowser/vuejs-dialog)
[![Scrutinizer](https://img.shields.io/scrutinizer/g/Godofbrowser/vuejs-dialog.svg?branch=master)](https://scrutinizer-ci.com/g/Godofbrowser/vuejs-dialog/?branch=master)
[![npm](https://img.shields.io/npm/dt/vuejs-dialog.svg)]()

![Vuejs Dialog Plugin](./src/docs/img/html-enabled.png?raw=true "Vuejs Dialog Plugin example")
![Vuejs Dialog Plugin](./src/docs/img/demo.gif?raw=true "Vuejs Dialog Plugin usage demo")


## Demo

[https://godofbrowser.github.io/vuejs-dialog/](https://godofbrowser.github.io/vuejs-dialog/)

## Installation

#### HTML
Include the script:

  ```html
  // Include vuejs
 <script type="text/javascript" src="./path/to/vue.min.js"></script>
 
 // Include the vuejs-dialog plugin
 <script type="text/javascript" src="./path/to/vuejs-dialog.min.js"></script>
 
 <script>
// Tell Vue to install the plugin.
window.Vue.use(VuejsDialog.default)
</script>
  ```
#### NPM
```javascript
// installation via npm 
npm install vuejs-dialog

// import into project
import Vue from "vue"
import VuejsDialog from "vuejs-dialog"

// Tell Vue to install the plugin.
Vue.use(VuejsDialog)
```

## Basic Usage

```javascript
// Anywhere in your Vuejs App.

this.$dialog.confirm('Please confirm to continue')
	.then(function () {
		console.log('Clicked on proceed')
	})
	.catch(function () {
		console.log('Clicked on cancel')
	});
```


## Usage with ajax - Loader enabled
```javascript
// Anywhere in your Vuejs App.

this.$dialog.confirm("If you delete this record, it'll be gone forever.", {
    loader: true // default: false - when set to true, the proceed button shows a loader when clicked.
    			// And a dialog object will be passed to the then() callback
})
	.then((dialog) => {
		// Triggered when proceed button is clicked

		// dialog.loading(false) // stops the proceed button's loader
		// dialog.loading(true) // starts the proceed button's loader again
		// dialog.close() // stops the loader and close the dialog

		// do some stuff like ajax request.
		setTimeout(() => {
			console.log('Delete action completed ');
			dialog.close();
		}, 2500);

	})
    .catch(() => {
        // Triggered when cancel button is clicked

        console.log('Delete aborted');
    });
```

## Usage as a directive

__If you don't pass a message, the global/default message would be used.__
```html
<button type="submit" v-confirm="">submit</button>
```

```html
// Callbacks can be provided
// Note: If "loader" is set to true, the makeAdmin callback will receive a "dialog" object
// Which is useful for closing the dialog when transaction is complete.
<button v-confirm="{ok: makeAdmin, cancel: doNothing, message: 'User will be given admin privileges. Make user an Admin?'}">Make Admin</button>
```
```javascript
methods: {
    makeAdmin: function() {
        // Do stuffs
        
    },
    doNothing: function() {
        // Do nothing or some other stuffs
    }
}
```

__A more practical use of ths `v-confirm` directive inside a loop__

```html
// While looping through users
<button v-for="user in users"
        v-confirm="{
            loader: true,
            ok: dialog => makeAdmin(dialog, user), 
            cancel: doNothing, 
            message: 'User will be given admin privileges. Make user an Admin?'}"
>
Make Admin
</button>
```
```javascript
methods: {
    makeAdmin: function(dialog, user) {
        // Make user admin from the backend
        /* tellServerToMakeAdmin(user) */
        
        // When completed, close the dialog
        /* dialog.close() */
        
    },
    doNothing: function() {
        // Do nothing or some other stuffs
    }
}
```

__For v-confirm directive, if an "OK" callback is not provided, the default event would be triggered.__

```html
// Default Behaviour when used on links
<a href="http://example.com" v-confirm="'This will take you to http://example.com. Proceed with caution'">Go to example.com</a>

```

## Setting a dialog title (new)

You can now set a dialog title by passing your message as an object instead of a string.
The message object should contain a `title` and `body`

```javascript
let message = {
    title: 'Vuejs Dialog Plugin',
    body: 'A lightweight, promise based alert, prompt and confirm dialog'
}

this.$dialog.confirm(message)
```


### Options
```javascript
// Parameters and options

let message = "Are you sure?";

let options = {
    html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
    loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
    reverse: false, // switch the button positions (left to right, and vise versa)
    okText: 'Continue',
    cancelText: 'Close',
    animation: 'zoom', // Available: "zoom", "bounce", "fade"
    type: 'basic', // coming soon: 'soft', 'hard'
    verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
    verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
    clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
    backdropClose: false // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask 
};

this.$dialog.confirm(message, options)
	.then(function () {
	    // This will be triggered when user clicks on proceed
	})
	.catch(function () {
	    // This will be triggered when user clicks on cancel
	});
```
### Global Configuration
```javascript
// You can also set all your defaults at the point of installation.
// This will be your global configuration

Vue.use(VuejsDialog, {
    html: true, 
    loader: true,
    okText: 'Proceed',
    cancelText: 'Cancel',
    animation: 'bounce', 
})

// Please note that local configurations will be considered before global configurations.
// This gives you the flexibility of overriding the global config on individual call.
```

### CSS Override

Please use basic css, ex:
```css
.dg-btn--ok {
     border-color: green;
 }
 
.dg-btn-loader .dg-circle {
    background-color: green;
}
```

### Pro tip
You can use any of the options in your verification help text. Example:

```javascript
this.$dialog.confirm($message, {
    verificationHelp: 'Enter "[+:verification]" below and click on "[+:okText]"',
     type: 'hard'
})
```

# License

[MIT](http://opensource.org/licenses/MIT)

## Contributing

Let's make it better :)