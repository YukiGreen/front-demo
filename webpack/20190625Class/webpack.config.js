// 单独提取css文件
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清理out文件夹
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 抽离html文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 入口
    entry: {
        index: './src/js/meituan-index.js',
        info: './src/js/meituan-info.js'
    },
    // 出口
    output: {
        filename: '[name]-[hash:5].js',
        path: __dirname + '/out'
    },
    // loaders使用
    module: {
        rules: [
            {
                test: /\.js$/, use: ['babel-loader']
            },
            {
                test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // 处理图片及字体图标
            {
                test: /\.jpg|png|svg|eot|ttf|woff/, use: ['url-loader?limit=1000&name=./[name].[ext]']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[hash:5 ].css'
        }),
        new CleanWebpackPlugin(),
        // 生成多个html页面
        // 首页html
        new HtmlWebpackPlugin({
            template: './meituan-index.html',
            filename: 'index.html',
            // 清除注释
            minify: {
                removeComments: true
            },
            // 确定该html引入的js入口名称，否则会把所有的js都引入
            chunks: ['index']
        }),
        // 跳转页
        new HtmlWebpackPlugin({
            template: './meituan-detail.html',
            filename: 'detail.html',
            // 清除注释
            minify: {
                removeComments: true
            },
            // 对应引入的js包
            chunks: ['info']
        })
    ],
    mode: 'development',
    // 通过启动服务打包的文件默认放到了内存下
    devServer: {
        port: '9191'
    }
}