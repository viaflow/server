import Sequelize from 'sequelize';

export default sequelize.define('flow', {
    flowId: { type: Sequelize.BIGINT(11), primaryKey: true },
    flowName: Sequelize.STRING,
    flowTags: Sequelize.STRING,
    triggerType: Sequelize.STRING,
    cron: Sequelize.STRING,
    flowTimezone: Sequelize.STRING,
    flowNodes: Sequelize.INTEGER,
    flowState: Sequelize.STRING,
    triggerCount: Sequelize.INTEGER,
    flowDescription: Sequelize.STRING,
    latestDate: Sequelize.DATE,
    latestStatus: Sequelize.STRING,
    nextDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    createdUser: Sequelize.BIGINT(11),
    updatedAt: Sequelize.DATE,
    updatedUser: Sequelize.BIGINT(11),
}, {
    tableName: 'flow',
});
