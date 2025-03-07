module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts'
  ],
  coverageReporters: ['lcov', 'text'],
  transform: {
    '^.+\\.ts?$': ['ts-jest']
  },
  testPathIgnorePatterns: [
    '<rootDir>/config/*'
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    'test/(.*)': '<rootDir>/test/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ]
}
