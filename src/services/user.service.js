import { User } from '../models';

export const userValidToken = async userId => User.findOne({
    attributes: ['userToken'],
    where: {
        userId,
    },
    raw: true,
});

export const userInfo = async (userId) => {

};
