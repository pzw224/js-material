var path = require('path');

module.exports = {
    entry: './app/main.js',
    output: {
        path: path.join(__dirname, '/public/js'),
        filename: 'pack.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.js|jsx$/, loaders: ['babel'] }
        ]
    }
}