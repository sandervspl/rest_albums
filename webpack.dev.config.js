const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'eval',

    devServer: {
        inline: true
    },

    entry: './src/index',

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.styl?$/,
                loader: ['style-loader', 'css-loader', 'stylus-loader'],
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    }
}