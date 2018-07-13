import Sequelize from 'sequelize';
import { dbConf } from '../config';

const sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password, dbConf);


(async () => {
    try {
        await sequelize.authenticate();
        global.sequelize = sequelize;
        Logger.log('database connected...');
    } catch (err) {
        Logger.error(`unable to connect to the database: ${err}`);
        Logger.error(dbConf);
    }
})();

// sequelize.authenticate().then(() => {
//     global.sequelize = sequelize;
//     Logger.log('database connected...');
// }).catch((err) => {
//     Logger.error(`unable to connect to the database: ${err}`);
//     Logger.error(dbConf);
// });
