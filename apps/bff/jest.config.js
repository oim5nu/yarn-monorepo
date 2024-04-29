/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */

module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|.*(\\.|/)(test|spec))\\.ts$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coveragePathIgnorePatterns: [
        'src/(.*)/(.*).d.ts',
        'src/(.*).stories.tsx',
        'src/(.*)/(.*).stories.tsx',
        'node_modules/(.*)'
    ],
    testResultsProcessor: 'jest-sonar-reporter'
};
