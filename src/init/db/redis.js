import Redis from 'ioredis';
import { redisConf } from '../config';

const redis = new Redis(redisConf.port, redisConf.host, {
    password: redisConf.auth,
    db: redisConf.db,
});

redis.on('error', (err) => {
    Logger.error(err);
});
global.redis = redis;
