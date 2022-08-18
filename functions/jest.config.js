/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 120000,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/src/api/**/*.test.ts'],
}
