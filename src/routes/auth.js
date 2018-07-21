import { body, validationResult } from 'express-validator/check';
import { verifyToken, generateJsonWebToken } from '../services/auth.service';
import { userInfoByPassword } from '../services/user.service';
import { applicationConf, tokenConf } from '../init/config';
/**
 * Login page
 * Check if has and verified access_token in cookie then redirect to param r.
 * If not initialize the page.
 */
export const AuthLoginGet = {
    path: '/login',
    method: 'get',
    auth: false,
    handler: async (req, res) => {
        Logger.log(req.query.r);
        if (!req.cookies[tokenConf.cookieName]) {
            // no token, render init page
            res.render('login', {});
            return;
        }

        // 使用db验证token有效性
        const verifyResult = await verifyToken(req.cookies.access_token);
        if (verifyResult.result) {
            Logger.trace(`Validated of user ${verifyResult.message.userId}`);
            // redirect to r or default
            res.redirect(req.query.r || applicationConf.index);
        } else {
            Logger.log('Invalid token, should login.');
            res.render('login', {});
        }
    },
};

export const AuthLoginPost = {
    path: '/login',
    method: 'post',
    auth: false,
    validator: [
        body('username')
            .not()
            .isEmpty()
            .withMessage('Incorrect username'),
        body('password')
            .isLength({ min: 6, max: 64 })
            .withMessage('Incorrect password'),
    ],
    handler: async (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg).array();

        const userInfo = await userInfoByPassword(req.body.username, req.body.password);

        !userInfo && (errors.push('invaild username or password'));

        if (errors.length > 0) {
            throw new Error(errors.toString());
        }

        // if has, do generate token things
        const token = generateJsonWebToken({
            sub: userInfo.get('userName'),
            role: userInfo.get('userRole'),
        });
        // save token to user data
        userInfo.userToken = token;
        await userInfo.save();
        // response cookie of token
        res.cookie(tokenConf.cookieName, token, tokenConf.cookieOptions);


        Logger.log(`req.body is ${JSON.stringify(req.body)}`); // { username: 'sa', password: 'yueyu521', remember: 'on' }
        Logger.log(`req.query is ${JSON.stringify(req.query)}`); // { r: '/test/aaa' }
        Logger.log(`req.cookies is ${JSON.stringify(req.cookies)}`);

        Logger.log('req.signedCookies is');
        Logger.log(req.signedCookies);
        res.redirect(req.query.r || applicationConf.index);
    },
};
