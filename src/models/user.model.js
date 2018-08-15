import Sequelize from 'sequelize';

export default sequelize.define('user', {
    userId: { type: Sequelize.BIGINT(11), primaryKey: true },
    userName: Sequelize.STRING,
    userToken: Sequelize.STRING,
    userPassword: Sequelize.STRING,
    userRole: Sequelize.STRING,
    controlTags: Sequelize.STRING,
    creator: Sequelize.BIGINT(11),
    createdAt: Sequelize.DATE,
    updater: Sequelize.BIGINT(11),
    updatedAt: Sequelize.DATE,
}, {
    tableName: 'user',
});
