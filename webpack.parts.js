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