import Sequelize from 'sequelize';

export default sequelize.define('node', {
    nodeId: { type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },
    flowId: Sequelize.BIGINT(11),
    parentId: Sequelize.BIGINT(11),
    sequence: Sequelize.INTEGER,
    signal: Sequelize.ENUM('ANY', 'SUCCESS', 'FAILURE'),
    pluginId: Sequelize.BIGINT(11),
    configurations: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    creator: Sequelize.BIGINT(11),
    updatedAt: Sequelize.DATE,
    updater: Sequelize.BIGINT(11),
}, {
    tableName: 'node',
});
