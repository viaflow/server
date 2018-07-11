import jwt from 'jsonwebtoken';

/**
 * Verify the token valid or not
 * @param {string} token token from cookie that application generated.
 * @return {Object} result: is verified, message: verified message
 */
export const verifyToken = async (token, secret) => {
    const verifyResult = jwt.verify(token, secret, {
        algorithms: 'HS256',
        ignoreExpiration: false,
        // maxAge: '7d',
    });
    Logger.log(verifyResult);
    return {
        result: true,
        message: verifyResult,
    };
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
