module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/client'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
