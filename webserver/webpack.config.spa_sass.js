const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require("autoprefixer");
const precss = require("precss");


// For spa.css
const extractSassForSpa = new ExtractTextPlugin({
    filename: "./public/css/spa.css"
});

const config = {
    entry: [
        './sass/spa.scss'
    ],
    output: {path: __dirname, filename: './public/css/[name].css'},
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSassForSpa.extract({
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
        extractSassForSpa,
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
