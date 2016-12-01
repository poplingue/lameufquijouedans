var path = require('path');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './css')
]
module.exports = {
    entry: './js/entry.js',
    output: {
        publicPath: '/js',
        path: path.join(__dirname, "./"),
        filename: "/js/output/bundle.js"
    },
    module: {
        loaders: [{
            test: [/\.js$/],
            exclude: /(node_modules)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
        }, {
            test: /\.sass$/,
            loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
        }]
    },
    plugins: [
        new ExtractTextPlugin('./css/output/style.css')
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.sass'],
        root: [path.join(__dirname, './')]
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    }
}
