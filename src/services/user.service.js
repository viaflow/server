import { User } from '../models';

export const userToken = async userId => User.findOne({
    attributes: ['userToken'],
    where: {
        userId,
    },
    raw: true,
});

export const userInfo = async (userId) => {

};
