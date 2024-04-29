const path = require('node:path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

// Override createHash if algorithm is md4 to sha256
const crypto = require('crypto');
const crypto_origin_createHash = crypto.createHash;
crypto.createHash = (algorithm) => crypto_origin_createHash(algorithm == 'md4' ? 'sha256' : algorithm);

// Common plugins
const WrapperPlugin = require('wrapper-webpack-plugin');
const fs = require('node:fs');

let plugins = [];

if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

let externals = ['utf-8-validate', 'bufferutil'];

externals.push('appdynamics');

const entry = isProduction
    ? [path.resolve(path.join(__dirname, './src/server.ts'))]
    : ['webpack/hot/poll?1000', path.resolve(paht.join(__dirname, './src/server.ts'))];

module.exports = {
    devtool: 'inline-source-map',
    performance: {
        hints: false
    },
    mode: nodeEnv || 'development',
    entry: entry,
    plugins: plugins,
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'server.bundle.js'
    },
    target: 'node',
    externals: externals,
    module: {
        rules: [
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.mjs$/,
                resolve: {
                    fullSpecified: false
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.js', '.json', '.gql', '.graphql']
    },
    ignoreWarnings: [
        {
            module: /node_modules\/express\/lib\/view\/.js/,
            message: /the request of a dependency is an expression/
        }
    ],
    optimization: {
        moduleIds: 'named',
        minimizer: [
            new TerserPlugin({
                extractComments: false // omit creation of LICENSE.txt files and the comments inside the bundle file
            })
        ]
    }
};
