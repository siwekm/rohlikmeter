const path = require('path');

module.exports = {
    entry: './script.js', // Your main script file
    output: {
        filename: 'bundle.js', // The output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development' // or 'production'
};
