const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: [
			'@babel/polyfill',
			'./src/index.js',
		]
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        watchContentBase: true
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html' },
            { from: 'node_modules/document-register-element/build/document-register-element.js', to: 'vendor'}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {loader: 'html-loader'}
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default     
                        options: {
                            sourceMap: true
                        }           
                    }
                ]
            }
        ]
    }
};