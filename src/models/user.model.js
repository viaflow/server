import Sequelize from 'sequelize';

export default sequelize.define('cronflow_user', {
    user_id: Sequelize.BIGINT(11),
    user_name: Sequelize.STRING,
    user_token: Sequelize.STRING,
    user_password: Sequelize.STRING,
    user_role: Sequelize.STRING,
    control_tags: Sequelize.STRING,
    creater: Sequelize.STRING,
    created_date: Sequelize.DATE,
});
