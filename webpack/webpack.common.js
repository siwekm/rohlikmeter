const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, '../src/index.js'),
        stats: path.join(__dirname, '../src/stats.js'),
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    /*
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    */
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        // exclude locale files in moment
        //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
