import Redis from 'ioredis';
import { dbConf } from '../config';

const redis = new Redis(dbConf.redis);
global.redis = redis;
