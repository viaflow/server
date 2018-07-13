const insecureUrl = [
    '/token/generate',
    '/login',
    '/logout',
    // /\/test\/*/,
    '/err',
    /\/auth\/*/,
];

const dbConf = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: process.env.DATABASE_DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 2000,
        idle: 5000,
    },
    logging: false,
};

const tokenConf = {
    expried: process.env.TOKEN_EXPRIED,
    secret: process.env.TOKEN_SECRET,
    algorithms: process.env.TOKEN_ALGORITHMS,
};

export { insecureUrl, dbConf, tokenConf };
