const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const codesandbox = require('remark-codesandbox');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = async ({ config }) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        include: [
          resolve(__dirname, '../src'),
          resolve(__dirname, '../demo')
        ],
        use: [
          require.resolve('ts-loader'),
          require.resolve('react-docgen-typescript-loader')
        ]
      },
      {
        test: /\.story\.mdx$/,
        exclude: [/node_modules/],
        include: [
          resolve(__dirname, '../src'),
          resolve(__dirname, '../docs'),
          resolve(__dirname, '../demo')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-react-jsx']
            }
          },
          {
            loader: '@mdx-js/loader',
            options: {
              compilers: [createCompiler({})],
              remarkPlugins: [
                [
                  codesandbox,
                  {
                    mode: 'iframe',
                    query: {
                      fontsize: 14
                    },
                    customTemplates: {
                      reaviz: {
                        extends: 'qr0pk',
                        entry: 'src/App.js'
                      },
                      'reaviz-map': {
                        extends: 'm1ker',
                        entry: 'src/App.js'
                      }
                    },
                    autoDeploy: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.story\.(js|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        loaders: [
          {
            loader: require.resolve('@storybook/source-loader'),
            options: {
              parser: 'typescript',
              injectParameters: true
            }
          }
        ],
        enforce: 'pre'
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: resolve(__dirname, '../')
      },
      {
        test: sassModuleRegex,
        include: resolve(__dirname, '../'),
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
               importLoaders: 1,
               modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: config.plugins,
  resolve: {
    ...config.resolve,
    modules: [
      ...config.resolve.modules,
      resolve(__dirname, '../src'),
      resolve(__dirname, '../docs'),
      resolve(__dirname, '../demo')
    ],
    extensions: [
      ...config.resolve.extensions,
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.mdx'
    ]
  }
});
