const HtmlWebpackPlugin = require("html-webpack-plugin");
//const DashboardPlugin = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
        }),
        //new DashboardPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ErrorOverlayPlugin(),
    ],
    devServer: {
        stats: 'errors-only',
        host: 'localhost',
        port: 8080,
        overlay: true,
        open: true // Open the page in browser
    }
}