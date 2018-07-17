import { body, validationResult } from 'express-validator/check';
import { userToken } from '../services/user.service';
/**
 * Login page
 * Check if has and verified access_token in cookie then redirect to param r.
 * If not initialize the page.
 */
export const AuthLoginGet = {
    path: '/login',
    method: 'get',
    handler: async (req, res) => {
        if (req.cookies.access_token) {
            // 使用db验证token有效性

        }
        res.cookie('app', 'cronflow', {
            signed: true,
            expires: new Date(Date.now() + 900000),
        });
        Logger.log(req.query.r);
        res.render('login', { token: await userToken(1) });
    },
};

export const AuthLoginPost = {
    path: '/login',
    method: 'post',
    validator: [
        body('username')
            .not()
            .isEmpty()
            .withMessage('Incorrect username'),
        body('password')
            .isLength({ min: 6, max: 64 })
            .withMessage('Incorrect password'),
    ],
    handler: (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg);
        Logger.error(errors.array());
        // TODO:
        // get fields from form. ✔️
        // validate to database.
        // generate jwt
        // save to cookie
        // rediect to source
        Logger.log(`req.body is ${JSON.stringify(req.body)}`); // { username: 'sa', password: 'yueyu521', remember: 'on' }
        Logger.log(`req.query is ${JSON.stringify(req.query)}`); // { r: '/test/aaa' }
        Logger.log(`req.cookies is ${JSON.stringify(req.cookies)}`);

        Logger.log('req.signedCookies is');
        Logger.log(req.signedCookies);
        res.render('login', {});
    },
};
