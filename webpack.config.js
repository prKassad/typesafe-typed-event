const path = require("path");
const pkg = require("./package.json");

// Plugins
const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin, BannerPlugin } = require("webpack");

// Variables
const sourcePath = path.join(__dirname, "./src/");
const outPath = path.join(__dirname, `./dist/`);

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const buildDate = new Date();

  const libraryName = pkg.name;
  const libraryBanner = `${pkg.name}\n${pkg.description}\n
@version v${pkg.version} - ${buildDate.toISOString()}
@author ${pkg.author}
@repository ${pkg.repository.url}
@license ${pkg.license}`;

  return {
    context: sourcePath,
    entry: ["main.ts"],
    output: {
      publicPath: "/",
      library: libraryName,
      libraryTarget: "umd",
      path: outPath,
      filename: "[name].js",
      chunkFilename: isProduction
        ? "chunks/[name].[contenthash].js"
        : "chunks/[name].[hash].js",
    },
    target: "node",
    resolve: {
      extensions: [".js", ".ts"],
      plugins: [new TSConfigPathsPlugin()],
      mainFields: ["module", "browser", "main"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ["ts-loader"],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        __LIB_VERSION__: JSON.stringify({
          build: pkg.version,
          date: buildDate.toISOString(),
          stamp: Math.floor(buildDate.getTime() / 1000),
        }),
      }),
      new BannerPlugin(libraryBanner),
    ],
    devtool: isProduction ? "hidden-source-map" : "eval-source-map",
  };
};
