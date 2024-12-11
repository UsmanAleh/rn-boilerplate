const path = require('node:path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname);
const { plugins, presets } = require(`${appDirectory}/babel.config.js`);
const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

const environment = process.env.NODE_ENV || 'development'; // Default to 'development' if not specified
let envFile = '.env';
let mode = 'development';

if (environment === 'development') {
  envFile = '.env.development';
  mode = 'development';
} else if (environment === 'staging') {
  envFile = '.env.staging';
  // Staging runs in development mode
  mode = 'development';
} else if (environment === 'production') {
  mode = 'production';
  envFile = '.env.production';
}

const customEnv = {
  ...process.env,
  NODE_ENV: environment,
};

module.exports = {
  devtool: environment === 'development' ? 'source-map' : false,
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  mode,
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
  performance: {
    hints: environment === 'development' ? false : 'warning', // Warnings enabled for staging and production
    maxAssetSize: 2_000_000, // 2 MB
    maxEntrypointSize: 3_000_000, // 3 MB
  },
  plugins: [
    /**
     * Uncomment the following line when you need to analyze the bundle sizes of the application or you run into the following issues:
     * 1. asset size limit | 2. entrypoint size limit
     * https://github.com/webpack-contrib/webpack-bundle-analyzer
     */
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.ProvidePlugin({
      process: require.resolve('process/browser'),
    }),
    new webpack.DefinePlugin({
      ...customEnv,
      __DEV__: environment === 'development',
    }),
    new Dotenv({
      path: path.resolve(__dirname, envFile),
    }),
  ],
  resolve: {
    alias: {
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
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
  },
};
