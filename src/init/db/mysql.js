import Sequelize from 'sequelize';
import { dbConf } from '../config';

const sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password, dbConf);
global.sequelize = sequelize;

sequelize.authenticate().then(() => {
    // global.sequelize = sequelize;
    Logger.log('database connected...');
}).catch((err) => {
    Logger.error(`unable to connect to the database: ${err}`);
    Logger.error(dbConf);
});
