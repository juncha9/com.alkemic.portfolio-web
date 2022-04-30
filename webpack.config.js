
const path = require('path');
const webpack = require('webpack');
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    mode: isDevelopment ? 'development' : "production",
    entry: './webpack/index',
    output: {
        path: path.join(__dirname, 'wwwroot', 'js'),
        publicPath: "/js/",
        filename: "bundle.js",
        //libraryTarget: "window",
        library: "webpack",
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)?$/, use: "ts-loader", exclude: "/node_modules/" }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }

}


