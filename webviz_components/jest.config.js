module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    globals: {
        NODE_ENV: 'test',
    },
    moduleDirectories: ['node_modules', 'packages'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileMock.js',
    },
    roots: ['./'],
    setupTestFrameworkScriptFile: './testSetup.js',
    transform: {
        '^.+\\.jsx?$': '<rootDir>/jestTransformer.js',
        '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
    },
    verbose: false,
};
