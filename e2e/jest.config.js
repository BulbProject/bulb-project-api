module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.spec.ts$',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -250
    },
  },
  collectCoverageFrom: ['src/**/*.ts'],
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src', 'e2e'],
  testPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules']
};
