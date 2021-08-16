var path = require('path');
// path是node中的环境变量，因webpack是基于node开发的，所以此处直接引入即可
// 此插件用于抽离出css文件
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        // index: './index.js'
        pageA: './src/pageA.js',
        pageB: './src/pageB.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash:5].bundle.js',
        // 导出公共模块的名称
        chunkFilename: "[name][hash:5].js"
    },
    // webpack4中的新特性
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',//限定在哪个模块下
                    minSize: 1,//包能抽离出来最小的体积，默认是30kb
                    minChunks: 2,   //设置被引入多少次的js文件，能被当作公共模块抽出来，也就是公共代码出现的最少的次数
                    priority: 1,
                },
                // 抽离第三方库
                vendor: {
                    name: 'vender',
                    test: /[\\/]node_modules[\\/]/,//正则匹配在这个文件夹下面进行查找
                    priority: 10,   //优先级越大越先执行
                    chunks: 'all',  //在哪一部分中被引入的
                }
            }
        }
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "async",//必须三选一:'inital'|'all'(推荐)|'async'(默认就是async)
    //         minSize: 30000,//最小尺寸，30000
    //         minChunks: 1,//最小chunk，默认1
    //         maxAsyncRequests: 5,//最大异步请求数，默认5
    //         maxInitialRequests: 3,//最大初始化请求书，默认3
    //         automaticNameDelimiter: '~',//打包分隔符
    //         name: function () { },//打包后的名称，此选项可接收function
    //         cacheGroups: {//这里开始设置缓存的chunks
    //             priority: 0,//缓存组优先级
    //             verdor: {//key 为entry中定义的入口名称
    //                 chunks: "initial",//必须三选一：'inital'|'all'(推荐)|'async'(默认就是async)
    //                 test: /react|lodash/,//正则规则验证，如果符合就提取chunk
    //                 name: "vendor",//要缓存的分隔出来的chunk名称
    //                 minSize: 30000,
    //                 minChunks: 1,
    //                 enforce: true,
    //                 maxAsyncRequests: 5,//最大异步请求数，默认1
    //                 maxInitialRequests: 3,//最大初始化请求数，默认数1
    //                 reuseExistingChunk: true    //可设置时候重用该chunk
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    // 这个postcss-loader要放在less-loader和css-loader之间
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // require('autoprefixer')(),
                                // 可解析变量，autoprefixer和'postcss-cssnext不能同时使用
                                // 这个插件也可以自动给属性加上前缀
                                require('postcss-cssnext')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash:5].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            title: 'My App',
            minify: {
                // 清理注释
                removeComments: true,
                // 去掉空格
                collapseWhitespace: true
            }
        }),
        // 每次清除上一次的打包文件
        // new CleanWebpackPlugin(),
    ],
    mode: 'development'
}