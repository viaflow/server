module.exports = {
    extends: 'airbnb-base',
    env: {
        node: true,
        es6: true,
    },
    rules: {
        "no-console": 2,
        "indent": ['error', 4],
        "quotes": ['error', 'single'],
        'no-unused-expressions': 0,
        "no-param-reassign": 0,
        "max-len": 0,
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
        route: true,
        sequelize: true,
        CronFlow: true,
        redis: true,
    }
};
