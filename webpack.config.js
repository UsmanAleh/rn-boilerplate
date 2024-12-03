const path = require('node:path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname);
const { plugins, presets } = require(`${appDirectory}/babel.config.js`);
const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/, // Updated to include .jsx
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'src/App.tsx'), // Updated to .jsx
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'component'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins,
      presets,
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const tsLoaderConfiguration = {
  exclude: /node_modules|\.d\.ts$/, // this line as well
  test: /\.(ts)x?$/,
  use: {
    loader: 'ts-loader',
    options: {
      compilerOptions: {
        noEmit: false, // this option will solve the issue
      },
    },
  },
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  ignoreWarnings: [
    {
      // Ignore warnings that contain the specific message
      message: /export 'AuthSessionOpenOptions' was not found/,
    },
  ],
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      tsLoaderConfiguration,
    ],
  },
  output: {
    filename: 'rnw.bundle.js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // Add Buffer polyfill
      process: require.resolve('process/browser'),
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
  ],
  resolve: {
    alias: {
      'react-native-encrypted-storage': path.resolve(__dirname, '/src/helpers/mockEncryptedStorage.js'),
      'react-native$': 'react-native-web',
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.js',
      '.web.jsx',
      '.js',
      '.jsx',
      '.json',
    ],
    fallback: {
      buffer: require.resolve('buffer'),
    },
    fullySpecified: false,
  },
};
