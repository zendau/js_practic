const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

console.log("isDev "+isDev)
console.log("isProd "+isProd)

const get_file_name = (env) => isDev ? `bundle.${env}` : `bundle[hash].${env}`

module.exports = {
    context: path.resolve(__dirname, 'public'),
    mode: 'development',
    entry: "/js/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: get_file_name("js")
    },
    devtool: isDev ? 'source-map' : false,
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "public"),
            "@core": path.resolve(__dirname, "public/core")
        }
    },
    devServer: {
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./table.html",
            filename: 'table.html',
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
            }
        }),
        new HtmlWebpackPlugin({
            template: "./main.html",
            filename: 'main.html',
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
            }
        }),
        new MiniCssExtractPlugin({
            filename: get_file_name("css")
        }),
        new ESLintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    }
}
