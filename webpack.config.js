// webpack.config.js
module.exports = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Creates `style` nodes from JS strings
            'css-loader', // Translates CSS into CommonJS
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: () => [require('autoprefixer')],
                },
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader', // Compiles Sass to CSS
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
  