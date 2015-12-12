var path = require('path');

module.exports = {
    entry: './JS/main.js',
    output: {
        path: path.join(__dirname, './JS'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};