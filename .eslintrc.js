module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  extends: ["eslint:recommended", "plugin:import/recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:jsx-a11y/recommended"],
  settings: {
    react: {
      version: "detect"
    }
  }
};
