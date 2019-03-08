const config = {
    babelrc: false,
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: true,
                modules: 'commonjs',
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-syntax-jsx',
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-transform-react-display-name',
        'babel-plugin-styled-components',
        '@babel/plugin-proposal-object-rest-spread',
    ],
};

module.exports = require('babel-jest').createTransformer(config);
