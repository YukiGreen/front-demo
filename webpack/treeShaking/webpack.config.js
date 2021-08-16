const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// const glob = require('glob');
// 将上面这句语句改成下面这句，并安装glob-all
const glob = require('glob-all');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 上面这个文件在老版本中还在用，但是推荐不要使用了。
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            // chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        // new ExtractTextPlugin('[name].[contenthash].css'),
        // Make sure this is after ExtractTextPlugin!
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            // 解析当前目录下的所有html
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js')
            ]),
        }),
        new WebpackDeepScopeAnalysisPlugin()
    ],
}