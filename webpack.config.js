const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'blocks-builder.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: { node: true }, modules: 'commonjs' }],
                    ],
                },
            },
        ],
    },
    target: 'node',
    externals: [nodeExternals()],
};
