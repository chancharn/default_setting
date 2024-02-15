# CRA 사용하지 않고 프로젝트 세팅

### 1. 폴더 세팅

> 1. mkdir <폴더명>
> 2. cd 폴더명
> 3. npm init
> 4. mkdir src public
> 5. cd src
> 6. touch index.js index.css
> 7. cd public
> 8. index.html

### 2. 라이브러리 설치

```terminal
npm i react react-dom

<!-- webpack 코어, 커멘드라인제어, 메모리에 웹팩을 빌드하는 서버 구동 모듈 -->
npm i -D webpack webpack-cli webpack-dev-server

<!-- 코드 파일들을 모듈로 인식하게 하는 로더 모듈 -->
npm i -D babel-loader css-loader style-loader postcss-loader clean-webpack-plugin html-webpack-plugin

<!-- 코드 컴파일러 -->
npm i @babel/core @babel/preset-react @babel/preset-env
```

### 3. 바벨 설정

```js
// babel.config.js

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};

// preset-env : es5 이하로 변환
// preset-react :jsx to js
```

### 4. webpack 설정

```js
// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    //번들링 대상 파일 확장자
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
    alias: { "@/*": path.resolve(__dirname, "/src/*") },
  },

  // 번들링 시작 점
  entry: { react_app: "./src/index.js" },

  // 번들링 결과물 저장 경로 및 파일 이름
  // 테스트 서버는 주로 build, 배포용 서버에는 dist
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  // webpack에 연결할 loader을 등록하는 객체
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        // 하나의 속성에 대해 2가지 이상 loader 사용 시 배열 형태
        // 등록하는 loader 순서 중요 (<- 방향으로 로더가 실행)
        // tailwindcss 적용 시 postcss-loader 추가
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      { test: /\.(jpg|png|svg|gif)$/, type: "asset/resource" },
    ],
  },

  // 번들링된 결과물에 특정 효과를 주는 도구
  plugins: [
    // 직전에 번들링한 파일 제거 플러그인
    new CleanWebpackPlugin(),
    // index.html에 bundling된 파일을 덮어주는 플러그인
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  devServer: {
    host: "localhost",
    port: process.env.PORT,
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: process.env.REACT_APP_BACKEND,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        secure: false,
      },
    },
  },
};
```

### 5. package.json script 설정

```json
//package.json

"scripts":{
    // webpack 5버전부터 webpack dev server 구동하려면 webpack serve로 설정해야함
    "start:dev":"webpack serve --progess --mode development",
    "start:build":"webpack"
}
```

### 6. index.js에 App 컴포넌트 연결

```jsx
// index.jsx

import React from "react";
import ReactDom from "react-dom";
import "./index.css";

const App = () => {
  return <div>Hello world!</div>;
};

ReactDom.render(<App />, document.getElementById("root"));
```

```index.html
...
<body>
    <div id="root"></div>
</body>
...
```

### 7. package.json 세팅

```json
"scripts": {
    "start:local": "env-cmd -f .env.local webpack serve --mode development",
    "build:dev": "env-cmd -f .env.development webpack --mode development",
    "build:prod": "env-cmd -f .env.production webpack --mode production",
  },

```

# tailwindcss 설치 및 적용

```
npm i -D tailwindcss postcss autoprefixer
```

```css
/* index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

```
// tailwind.config.js 생성

npx tailwindcss init
```

```js
// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```js
// postcss.config.js 생성

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

# 절대경로 @ 선언

```
npm i -D eslint eslint-plugin-import

npx eslint --init
```

```js
// eslintrc.js

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "import"],
  rules: {
    "import/order": [
      // `import/order` 규칙 추가
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "react*,react*/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**/*",
            group: "internal",
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
};
```

```json
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### typescript 설치

```
npm i typescrity @types/node @types/react @types/react-dom @types/jest
```
