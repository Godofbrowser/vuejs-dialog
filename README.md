# Vuejs Dialog Plugin

> A lightweight, promise based alert, prompt and confirm dialog.

[![npm version](https://badge.fury.io/js/vuejs-dialog.svg)](https://badge.fury.io/js/vuejs-dialog)
[![Build Status](https://scrutinizer-ci.com/g/Godofbrowser/vuejs-dialog/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Godofbrowser/vuejs-dialog/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Godofbrowser/vuejs-dialog/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Godofbrowser/vuejs-dialog/?branch=master)

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
window.Vue.use(VuejsDialog)
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

## Usage as a directive (new)

If you don't pass a message, the global/default message would be used.
```html
<button type="submit" v-confirm="">submit</button>
```


```html
// Callbacks can be provided
// Note: If "loader" is set to true, the makeAdmin callback will be passed a "dialog" object
// Which is useful for stoping the loader, or closing the dialog.
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


For v-confirm directive, if an "OK" callback is not provided, the default event would be triggered.

```html
// You can use it on links too
<a href="http://example.com" v-confirm="'This will take you to http://example.com. Proceed with caution'">Go to example.com</a>

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
    clicks: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
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
# License

[MIT](http://opensource.org/licenses/MIT)

## Contributing

Let's make it better :)