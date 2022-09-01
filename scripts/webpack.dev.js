const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  mode: 'development', // 开发模式
  devServer: {
    hot: true, // 热更新
    open: true, // 编译完自动打开浏览器
    compress: false, // 关闭gzip压缩
    port: 7878, // 开启端口号
    historyApiFallback: true, // 支持 history 路由重定向到 index.html 文件
  },
  module: {
    // 插件的执行顺序从右到左
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
  stats: 'errors-only', // Webpack 在编译的时候只输出错误日志，终端更清爽
});
