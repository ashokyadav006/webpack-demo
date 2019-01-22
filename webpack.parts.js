const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

exports.devServer = ({ host, port} = {}) => ({
    devServer:{
        stats: "errors-only",
        host,
        port,
        open: true,
        overlay: true
    }
});

exports.loadCSS = ({ include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css"
    });

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,
                    use: [
                        MiniCssExtractPlugin.loader,
                    ].concat(use)
                }
            ]
        },
        plugins: [plugin],
    };
};

exports.purgeCss = ({ paths }) => ({
    plugins: [ 
        new PurgeCSSPlugin({ paths })
    ]
});

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: {
                    loader: 'url-loader',
                    options,
                }
            }
        ]
    }
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader"
            }
        ]
    }
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});