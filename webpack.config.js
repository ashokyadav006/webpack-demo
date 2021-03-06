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
    build: path.join(__dirname, "dist"),
};

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            })
        ]
    },
    parts.loadCSS(),
    parts.loadJavaScript({ include: PATHS.app }),
    parts.generateSourceMaps({ type: 'source-map'}),
    parts.setFreeVariable("HELLO", "hello from config"),
    //parts.attachRevision(),
]);

const productionConfig = merge([
    //parts.minifyJavaScript(),
    {
        output: {
            chunkFilename: "[name].[chunkhash:4].js",
            filename: "[name].[chunkhash:4].js",
        }
    },
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true
            },
            safe: true,
        },
    }),
    parts.clean(PATHS.build),
    parts.extractCSS({
        use: [ "css-loader", parts.autoprefix(), "sass-loader"]
    }),
    parts.purgeCss({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
    parts.loadImages({
        options: {
            limit: 15000, //15kb
            name: "[name].[hash:4].[ext]"
        }
    }),
    {
        optimization: {
            splitChunks: {
                chunks: "initial",
            },
        },
    },
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
    },
    parts.loadImages()
]);

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
}