import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
import { tokenConf } from '../init/config';
import { userToken } from './user.service';

/**
 * Verify the token valid or not
 * @param {string} token token from cookie that application generated.
 * @return {Object} result: is verified, message: verified message
 */
export const verifyToken = async (token) => {
    try {
        // verify expried and regular
        const verifyResult = jwt.verify(token, tokenConf.secret, {
            algorithms: tokenConf.algorithm,
            ignoreExpiration: false,
            maxAge: tokenConf.expiresIn,
        });

        // verify from database by userId(sub)
        const tokenInfo = await userToken(verifyResult.sub, true);
        if (tokenInfo && tokenInfo.userToken === token) {
            return {
                result: true,
                message: verifyResult,
            };
        }
        throw new Error('User and token mismatch');
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

/**
 * Encrypt string with hmac
 * @param {string} str the string that you wan't encrypt.
 * @return {string} encrypted string
 */
export const hmacEncryptHmac = (str) => {
    Logger.log(str);
};

/**
 * Decrypt string with hamc
 * @param {string} str the string that you wan't decrypt.
 * @return {string} decrypted string
 */
export const hmacDecrypt = (str) => {
    Logger.log(str);
};

/**
 * Decrypt string with hamc
 * @param {Object} payload json object that you want put in jwt payload.
 * @return {string} json web token
 */
export const generateJsonWebToken = payload => jwt.sign(payload, tokenConf.secret, {
    algorithm: tokenConf.algorithm,
    expiresIn: tokenConf.expiresIn,
    audience: 'cronflow',
});
