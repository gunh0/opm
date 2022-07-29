module.exports = {
  extends: ["prettier"],
  plugins: ["import", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal", // https://github.com/benmosher/eslint-plugin-import/issues/807
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
};
