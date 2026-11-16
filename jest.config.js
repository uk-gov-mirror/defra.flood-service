module.exports = {
  testEnvironment: 'node',
  restoreMocks: true,
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testMatch: ['**/test/**/*.js'],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage'
}
