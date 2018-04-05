const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');
const fileName = isProd ? 'bundle.js.[hash]' : 'bundle.js';

const config = {
    entry: [
        'babel-polyfill',
        './client/main.js'
    ],
    output: {path: __dirname + '/public/js', filename: fileName, publicPath: '/js'}, // publicPath is necessary for html-webpack-plugin
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'happypack/loader?id=js'
                }]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'happypack/loader?id=js',
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }],

    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        'redux': 'Redux',
        'react-redux': 'ReactRedux'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HappyPack({
            id: 'js',
            cache: true,
            threads: 4,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    plugins: ['transform-flow-strip-types'],
                    presets: ['es2015', 'react', 'stage-0', 'stage-1', "flow"],
                    cacheDirectory: true
                }
            }]
        }),
        new HtmlWebpackPlugin({
            template: './public/_spa_template.html',
            assets: {
                "bundle": './public/js/bundle.js.[hash]'
            },
            filename: '../spa.html',
            inject: 'body'
        }),
        new FlowBabelWebpackPlugin(),
    ],
    //devtool: isProd ? 'source-map' : '', // No source map for production
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    }
};


module.exports = config;
