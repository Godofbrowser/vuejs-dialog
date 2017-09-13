const fs = require('fs-extra');

const source = './dist/vuejs-dialog.min.js';
const dest = './docs/js/vuejs-dialog.min.js';

fs.copy(source, dest, function (err) {

    if (err)
    {
        return console.error(err);
    }

    console.log('Copied to ' + dest);

});