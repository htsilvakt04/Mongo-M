let path = require('path');
let webpack = require('webpack');

let config  = {
    entry: [ 'whatwg-fetch', 'babel-polyfill', './client/index.js' ],
    output: {
        path:  path.resolve(__dirname, './client/static/js'),
        filename: 'home-page.bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    plugins: []
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;