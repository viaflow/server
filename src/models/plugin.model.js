import Sequelize from 'sequelize';

export default sequelize.define('plugin', {
    pluginId: { type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },
    pluginName: Sequelize.STRING,
    pluginDesc: Sequelize.STRING,
    pluginRepo: Sequelize.STRING,
    pluginTargetDir: Sequelize.STRING,
    pluginPath: Sequelize.STRING,
    pluginCompiledPath: Sequelize.STRING,
    pluginVersion: Sequelize.STRING,
    pluginWorkBranch: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    creator: Sequelize.BIGINT(11),
    updatedAt: Sequelize.DATE,
    updater: Sequelize.BIGINT(11),
}, { tableName: 'plugin' });
