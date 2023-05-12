const path = require("path");


module.exports = {
    module: {
        rules: [
            {
              test: /\.wasm$/,
              type: "javascript/auto",
              use: [
                {
                  loader: "file-loader",
                  options: {
                    name: "[name].[ext]",
                    outputPath: "static/media/",
                    publicPath: "static/media/",
                  },
                },
              ],
            },
          ],
      },

    resolve: {
        fallback: {
            assert: require.resolve('assert'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
            net: require.resolve('net-browserify'),
        },
    },
};