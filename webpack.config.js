const HtmlWebpackPlugin = require("html-webpack-plugin");
//const DashboardPlugin = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require("webpack-merge");
const path = require("path");
const glob = require("glob");

const parts = require('./webpack.parts');


const PATHS = {
    app: path.join(__dirname, "src"),
};

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            })
        ]
    },
    parts.loadCSS()
]);

const productionConfig = merge([
    parts.extractCSS({
        use: [ "css-loader", parts.autoprefix(), "sass-loader"]
    }),
    parts.purgeCss({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
]);

const developmentConfig = merge([
    parts.devServer({
        host: 'localhost',
        port: 8080
    }),
    {
        plugins: [
            //new DashboardPlugin(),
            new FriendlyErrorsWebpackPlugin(),
            new ErrorOverlayPlugin(),
        ]
    }
]);

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
}