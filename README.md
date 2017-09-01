# Vuejs Dialog Plugin

> A robost, promise based alert and confirm dialog.

![Vuejs Dialog Plugin](./src/example/img/html-enabled.png?raw=true "Vuejs Dialog Plugin example")
![Vuejs Dialog Plugin](./src/example/img/demo.gif?raw=true "Vuejs Dialog Plugin usage demo")

## Installation

Todo:: publish plugin

## Basic Usage
```javascript
// Parameters

let message = "Are you sure?";

let options = {
    html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
    loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
    type: 'simple', // coming soon: 'soft', 'hard'
    verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
    clicks: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
};

vm.$dialog.confirm(message, options)
	.then(function () {
	    // This will be triggered when user clicks on proceed
	})
	.catch(function () {
	    // This will be triggered when user clicks on cancel
	});
```

```javascript
// Anywhere in your Vuejs App.

vm.$dialog.confirm('Please confirm to continue')
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

vm.$dialog.confirm("If you delete this record, it'll be gone forever.", {
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
