const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssEtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  mode: "production", // LE INDICO EL MODO EXPLICITAMENTE
  entry: "./src/index.js", // el punto de entrada de mi aplicación
  output: {
    // Esta es la salida de mi bundle
    path: path.resolve(__dirname, "dist"),
    // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
    // para no tener conflictos entre Linux, Windows, etc
    filename: "[name].[contenthash].js",
    // EL NOMBRE DEL ARCHIVO FINAL,
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  watch: true,
  resolve: {
    extensions: [".js"], // LOS ARCHIVOS QUE WEBPACK VA A LEER
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    // REGLAS PARA TRABAJAR CON WEBPACK
    rules: [
      {
        test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
        exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssEtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssEtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new DotEnv(),
  ],
};
