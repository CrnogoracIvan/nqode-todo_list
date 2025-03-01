export default {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}', // Include all files in src
        '!src/**/*.d.ts', // Exclude TypeScript declaration files
        '!src/index.tsx', // Exclude entry points (if needed)
        '!src/**/styles.ts', // Exclude style files (if needed)
        '!src/**/constants.ts', // Exclude constants files (if needed)
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html', 'lcov'],
};