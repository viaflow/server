import jwt from 'jsonwebtoken';
import { tokenConf } from '../init/config';
/**
 * Verify the token valid or not
 * @param {string} token token from cookie that application generated.
 * @return {Object} result: is verified, message: verified message
 */
export const verifyToken = async () => {
    try {
        // verify expried and regular
        const verifyResult = jwt.verify(tokenConf.token, tokenConf.secret, {
            algorithms: tokenConf.algorithms,
            ignoreExpiration: false,
            maxAge: tokenConf.expried,
        });

        // verify from database


        return {
            result: true,
            message: verifyResult,
        };
    } catch (e) {
        return {
            result: false,
            message: e,
        };
    }
};

/**
 * Serialize token information from json web token
 * @param {string} token token from cookie that application generated.
 * @return {Object} payload json object
 */
export const serializeToken = (token) => {
    Logger.log(now);
    return `${token}`;
};
