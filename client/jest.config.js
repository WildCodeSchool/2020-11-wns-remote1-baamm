module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/client'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
