var path = require('path');
// 打包导出html文档
var HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // entry: './src/index.js',
    entry: {
        index: './src/index.js',
        app: './src/app.js'
    },
    output: {
        // __dirname输出文件保存的路径，
        // dist，输出文件导出的文件夹
        // filename导出文件的名字
        path: path.resolve(__dirname, 'dist'),
        // 有几个入口文件，就会有几个导出文件
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']}
        ]
    },
    plugins: [
        new HtmlwebpackPlugin()
    ],
    // 设置模式
    // 模式设置为development，打包后的文件不是压缩版
    mode: 'development',
}