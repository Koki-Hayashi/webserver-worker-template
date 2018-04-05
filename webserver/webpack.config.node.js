const webpack = require('webpack');
const HappyPack = require('happypack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProd = (process.env.NODE_ENV === 'production');

const config = {
    target: 'node',
    externals: [nodeExternals()],
    entry: [
        './node_modules/babel-polyfill/dist/polyfill.min.js',
        './bin/www'
    ],
    output: {path: __dirname, filename: 'server.js'},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'happypack/loader?id=js'
                }]
            }]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
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
        new FlowBabelWebpackPlugin()
    ],
    devtool: isProd ? '' : 'source-map', // No source map for production
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
        __dirname: true
    }
};


module.exports = config;
