import { User } from '../models';

export const userToken = async (userName, raw = false) => User.findOne({
    attributes: ['userId', 'userToken'],
    where: {
        userName,
    },
    raw,
});

export const userInfoByPassword = async (userName, userPassword, raw = false) => User.findOne({
    where: {
        userName,
        userPassword, // TODO: encrypt password
    },
    raw,
});
