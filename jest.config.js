module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageReporters: ['lcov', 'text'],
  transform: {
    '^.+\\.ts?$': ['ts-jest']
  }
}
