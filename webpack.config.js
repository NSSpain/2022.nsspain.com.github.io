const { ProvidePlugin } = require('webpack');
const path = require('path');
const { resolve, join } = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourceDirectory = resolve(__dirname, 'src');
const staticFilesDirectory = resolve(__dirname, 'static');
const buildDirectory = resolve(__dirname, 'deploy');

module.exports = (env) => {
    const isProduction = env.production;
    const publicPath = '/';
    const imagesLocation = 'images';

    return {
        context: sourceDirectory,
        entry: {
            main: path.resolve(__dirname, './src/app.js'),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(s(a|c)ss)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
                    use: {
                        loader: 'url-loader',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx'],
            alias: {
                '../../theme.config$': path.join(__dirname, 'semantic-theme/theme.config'),
                '../../icons': path.join(__dirname, 'node_modules/semantic-ui-sass/icons'),
            }
        },
        plugins: [
            new MiniCssExtractPlugin(),

            new CopyWebpackPlugin({
                patterns: [
                    { from: imagesLocation, to: imagesLocation },
                    { from: staticFilesDirectory, to: buildDirectory },
                ],
            }),

            new ImageminPlugin({
                disable: !isProduction,
                test: `${imagesLocation}/**`,
                optipng: {
                    optimizationLevel: 5,
                },
                jpegtran: {
                    progressive: true,
                },
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
            }),

            new HtmlWebpackPlugin({
                filename: 'about.html',
                template: './about.html',
            }),

            new HtmlWebpackPlugin({
                filename: 'coc.html',
                template: './coc.html',
            }),

            new HtmlWebpackPlugin({
                filename: 'faq.html',
                template: './faq.html',
            }),

            new HtmlWebpackPlugin({
                filename: 'travel.html',
                template: './travel.html',
            }),

            new HtmlWebpackPlugin({
                filename: 'remo.html',
                template: './remo.html',
            }),

            new ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
        ],
        output: {
            path: path.resolve(__dirname, 'deploy'),
            filename: '[name].bundle.js',
            publicPath
        },
    }
};
