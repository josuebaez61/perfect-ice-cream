const HtmlWebPackPluging = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    mode: 'development',
    optimization:{
        minimizer: [new OptimizeCssAssetsPlugin({})]
    },
    module: {
        rules:[
            {
              test: /\.js$/, 
              exclude: /node_modules/, 
              loader: "babel-loader"
            },
	    {
	      test: /\.(c|sc|sa)ss$/,
	      use: [
		MiniCssExtractPlugin.loader,
		'css-loader',
		'sass-loader'
	      ]
	    },
	    {
		test: /\.(c|sc|sa)ss$/,
		exclude: /styles\.(c|sc|sa)ss$$/,
		use: [
		    MiniCssExtractPlugin.loader,
		    'style-loader',
		    'css-loader',
		    'sass-loader'
		]
	    },
	    {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: true
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPluging({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [{
                from: 'src/assets', to: 'assets/'
            }]
        }),
        new MinifyPlugin(),
    ]
}
