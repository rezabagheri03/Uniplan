/** jest.config.js */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']
}
