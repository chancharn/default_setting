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
          // ...
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
};
