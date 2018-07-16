import Sequelize from 'sequelize';

export default sequelize.define('user', {
    userId: Sequelize.BIGINT(11),
    userName: Sequelize.STRING,
    userToken: Sequelize.STRING,
    userPassword: Sequelize.STRING,
    userRole: Sequelize.STRING,
    controlTags: Sequelize.STRING,
    creater: Sequelize.BIGINT(11),
    createdAt: Sequelize.DATE,
    updater: Sequelize.BIGINT(11),
    updatedAt: Sequelize.DATE,
}, {
    tableName: 'user',
});
