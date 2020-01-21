

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
    ],
};

module.exports = env => {
    if (env) {
        return {
            mode: 'production',
            entry: './src/jsonViewer.js',
            output: {
                filename: 'json-viewer.min.js',
                libraryTarget: 'umd',
                path: path.resolve(__dirname, 'lib'),
            },
            module: loaders,
            plugins: [
                new MinifyPlugin({}, {}),
                new CleanWebpackPlugin(),
            ]
        }
    }

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'dist'),
        },
        module: loaders,
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new CleanWebpackPlugin(),
        ],
    }

};
