const { merge } = require('webpack-merge');
module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.wasm$/,
          type: 'javascript/auto',
          loader: 'arraybuffer-loader',
        },
      ],
    },
  });
};
