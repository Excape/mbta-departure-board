module.exports = {
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "react-app",
    "plugin:prettier/recommended",
  ],
  plugins: ["jsx-a11y", "prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
};
