const debug = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-source-map" : null,
    entry: "./src/app/index.ts",
    output: {
        path: __dirname + "/dist",
        filename: "dist.min.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader",
                options: { /* Loader options go here */ }
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: "body",
        }),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};