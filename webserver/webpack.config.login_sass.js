const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require("autoprefixer");
const precss = require("precss");

const extractSassForIndex = new ExtractTextPlugin({
    filename: "./public/css/index.css"
});

const config = {
    entry: [
        './sass/index.scss'
    ],
    output: {path: __dirname, filename: './public/css/[name].css'},
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSassForIndex.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }, {
                    loader: "postcss-loader"
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSassForIndex,
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({browsers: ['last 2 versions']}),
                    precss
                ]
            }
        })
    ]
};

module.exports = config;