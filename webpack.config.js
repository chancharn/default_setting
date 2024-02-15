const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
    alias: { "@/*": path.resolve(__dirname, "/src/*") },
  },
  // ts시 tsx
  entry: { react_app: "./src/index.tsx" },
  // 테스트 서버는 주로 build, 배포용 서버에는 dist0
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,

        //  tailwindcss 적용 시 postcss-loader 추가
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      { test: /\.(jpg|png|svg|gif)$/, type: "asset/resource" },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  devServer: {
    host: "localhost",
    port: 8080,
    // env 파일로 분기처리하려면 아래와 같이 작성
    // port: process.env.PORT,
    // proxy: {
    //   "/api": {
    //     target: process.env.REACT_APP_BACKEND,
    //     changeOrigin: true,
    //     pathRewrite: { "^/api": "" },
    //     secure: false,
    //   },
    // },
    hot: true,
    open: true,
  },
};
