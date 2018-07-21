const insecureUrl = [
    '/login',
    '/logout',
    // /\/test\/*/,
    '/err',
    /\/auth\/*/,
];

const dbConf = {
    host: process.env.DATABASE_HOST || 'mysql',
    port: process.env.DATABASE_PORT || 3306,
    database: process.env.DATABASE_NAME || 'cronflow',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    pool: {
        max: 10,
        min: 2,
        acquire: 2000,
        idle: 5000,
    },
    logging: true,
};

const tokenConf = {
    cookieName: process.env.TOKEN_NAME || 'access_token',
    expiresIn: process.env.TOKEN_EXPRIED || '7d',
    secret: process.env.TOKEN_SECRET,
    algorithm: process.env.TOKEN_ALGORITHMS || 'HS256',
    cookieOptions: {
        expires: (() => new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)))(),
    },
};

const applicationConf = {
    index: '/admin',
};

export {
    insecureUrl, dbConf, tokenConf, applicationConf,
};
