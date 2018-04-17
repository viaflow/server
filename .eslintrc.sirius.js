module.exports = {
    extends: 'airbnb-base',
    env: {
        node: true,
        es6: true,
    },
    rules: {
        'no-console': 'off',
        indent: ['error', 4],
        quotes: ['error', 'single'],
    },
    parserOptions: {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    plugins: [
        "import",
        "jest"
    ],
    parser: "babel-eslint",
    globals: {
        app: true,
        express: true,
        Logger: true,
        path: true,
        fs: true,
        moment: true,
        _: true,
        NODE_ENV: true,
        now: true,
        Router: true
    }
};
