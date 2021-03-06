const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cssnano = require('cssnano')
const path = require('path')

const vendor = [
  'calculate-size',
  'classnames',
  'graphiql',
  'immutable',
  'js-cookie',
  'lokka',
  'lokka-transport-http',
  'map-props',
  'moment',
  'normalize.css',
  'rc-tooltip',
  'react',
  'react-addons-pure-render-mixin',
  'react-autocomplete',
  'react-click-outside',
  'react-copy-to-clipboard',
  'react-datetime',
  'react-dom',
  'react-notification-system',
  'react-redux',
  'react-relay',
  'react-router',
  'react-router-relay',
  'react-tagsinput',
  'react-tether',
  'react-tooltip',
  'react-twitter-widgets',
  'redux',
  'redux-thunk',
  'smooch',
]

module.exports = {
  entry: {
    app: './src/main',
    vendor,
  },
  output: {
    path: './dist',
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    preLoaders: [{
      test: /\.ts(x?)$/,
      loader: 'tslint',
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.json/, // TODO check if still needed
      loader: 'json',
    }, {
      test: /\.css/,
      loader: 'style!css',
    }, {
      test: /\.scss/,
      loader: 'style!css?modules&importLoaders=1!postcss!sass?sourceMap',
    }, {
      test: /\.ts(x?)$/,
      loader: 'babel!ts',
      exclude: /node_modules/,
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.mp3$/,
      loader: 'file',
    }, {
      test: /icons\/.*\.svg$/,
      loader: 'raw!svgo?{"plugins":[{"removeStyleElement":true}]}',
    }, {
      test: /graphics\/.*\.svg$/,
      loader: 'file',
    }, { // TODO remove this loader and also `imports-loader` dependency
      test: /load-image/,
      loader: 'imports?define=>false'
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      __BACKEND_ADDR__: JSON.stringify(process.env.BACKEND_ADDR.toString()),
      __SEGMENT_TOKEN__: '"M96lXuD90ZxkbQEQG716aySwBLllabOn"',
      __ENABLE_SEGMENT__: true,
      __SMOOCH_TOKEN__: '"505tvtkv5udrd4kc5dbpppa6x"',
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
    }),
    new HtmlWebpackPlugin({
      favicon: 'static/favicon.png',
      template: 'src/index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
  ],
  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions'],
      },
      discardComments: {
        removeAll: true,
      },
      safe: true,
    })
  ],
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['', '.js', '.ts', '.tsx'],
    alias: { // TODO remove when resolved: https://github.com/smooch/smooch-js/issues/357
      faye: 'faye/browser/faye-browser',
    },
  }
}
