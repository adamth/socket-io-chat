const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: { 
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: 'babel-loader'
            }
        ]
    }
};
