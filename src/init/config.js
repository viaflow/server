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

const redisConf = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    auth: process.env.REDIS_AUTH || null,
    db: process.env.REDIS_DB || 0,
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
    pluginDir: 'plugins',
    pluginCompiledDir: 'viaflow_compiled',
    pluginEntryFile: 'index.js',
    babelCmd: 'babel',
    babelParams: ['./', '-s', '-D', '-d', 'viaflow_compiled'],
    npmCmd: 'npm',
    npmParams: ['i', '--no-package-lock'],
};

if (process.env.NPM_REGISTRY_TAOBAO === 'true') {
    // eslint-disable-next-line
    console.log('···将使用淘宝npm仓库···');
    applicationConf.npmParams.push('--registry=https://registry.npm.taobao.org');
}

export {
    dbConf, tokenConf, applicationConf, redisConf,
};
