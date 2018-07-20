import { User } from '../models';

export const userToken = async userId => User.findOne({
    attributes: ['userToken'],
    where: {
        userId,
    },
    raw: true,
});

export const userInfoByToken = async (userToken) => {

};

export const userInfoByUserId = async (userId) => {

};

export const userInfoByPassword = async (userName, userPassword) => {
    User.findOne({
        where: {
            userName,
            userPassword, // TODO: encrypt password
        },
        raw: true,
    });
};
