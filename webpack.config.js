var path = require("path");

module.exports = {
    entry: './js/entry.js',
    output: {
        publicPath: '/js',
        path: path.join(__dirname, "/js/output"),
        filename: "lameufquijouedans.bundle.js"
    },
    module: {
        loaders: [{
            test: [/\.js$/],
            exclude: /(node_modules)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
        }]
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    }
}
