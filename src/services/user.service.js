import { User } from '../models';

export const userValidToken = userId => User.findOne({
    attributes: ['user_token'],
    where: {
        user_id: userId,
    },
});

export const userInfo = async (userId) => {

};
