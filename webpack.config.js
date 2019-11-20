const path = require('path')
const webpack = require('webpack')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
    const isProd = undefined !== env && env.mode.startsWith('prod')

    const fileName = isProd ? 'assets/[name].[hash].js' : 'assets/[name].js'

    const config = {
        mode: isProd ? 'production' : 'development',
        entry: {
            bundle: './src/index.tsx'
        },
        output: {
            filename: fileName,
            publicPath: '',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ],
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [ { loader: 'ts-loader' } ]
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader'
                }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            // new MiniCssExtractPlugin({
            //     filename: 'main-[hash:8].css'
            // }),
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            writeToDisk: false,
            hot: true,
            overlay: true,
            historyApiFallback: true,
        },
        devtool: 'source-map',
    }

    if (isProd) {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }

    return config
}