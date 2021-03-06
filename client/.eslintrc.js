module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser

  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features

    sourceType: 'module', // Allows for the use of imports
    tsconfigRootDir:__dirname,
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },

    project: './tsconfig.json',
  },

  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'airbnb-typescript',
    // 'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react

    // 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],

  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // "indent": ["error", 2],
    // "comma-dangle": [1, "never"],
  },
};
