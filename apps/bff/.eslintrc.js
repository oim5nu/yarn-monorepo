module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslnt'],
    extends: ['prettier'],
    rules: {
        quotes: [2, 'single'],
        'no-console': 'off',
        'no-duplicate-imports': 2,
        'object-literal-sort-keys': 0,
        'no-trailing-whitespace': 0,
        'max-classes-per-file': [2, 15]
    },
    ignorePatterns: [
        '**/config/**/*.js',
        '**.node_modules/**/*.{ts,js,tsx,jsx}',
        '**/coverage/lcov-report/*.js',
        '**/public/webcomponentsjs'
    ]
};
