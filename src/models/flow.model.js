import Sequelize from 'sequelize';

export default sequelize.define('user', {
    flowId: { type: Sequelize.BIGINT(11), primaryKey: true },
    flowName: Sequelize.STRING,
    flowTags: Sequelize.STRING,
    userPassword: Sequelize.STRING,
    userRole: Sequelize.STRING,
    controlTags: Sequelize.STRING,
    creater: Sequelize.BIGINT(11),
    createdAt: Sequelize.DATE,
    updater: Sequelize.BIGINT(11),
    updatedAt: Sequelize.DATE,
}, {
    tableName: 'flow',
});
