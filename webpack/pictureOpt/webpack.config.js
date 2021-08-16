var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Webpack = require('webpack');
module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash:5].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name][hash:5].[ext]',    //[ext]能取到该图片是什么格式的
                            // 限制图片大小 <=100kb 进行base64编码，如果大于就打包出来
                            // limit: 100000,
                            limit: 100,
                            outputPath: 'img'   //抽离出图片时，图片放置的文件夹目录
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-pngquant')({
                                    quality: [0.3, 0.5]
                                }),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src']
                        }
                    }
                ]
            }
        ]
    },
    mode: 'development',
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: '9091',
        contentBase: 'dist',   //默认打开的文件夹
        hot: true
    }
}