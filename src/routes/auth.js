import { body, validationResult } from 'express-validator/check';

export const LoginInit = {
    path: '/login',
    method: 'get',
    handler: (req, res) => {
    // req.secret;
        res.cookie('app', 'cronflow', {
            signed: true,
            expires: new Date(Date.now() + 900000),
        });
        Logger.log(req.query.r);
        res.json({});
    },
};

export const Login = {
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
        // get fields from body. ✔️
        // validate to database.
        // generate jwt
        // save to cookie
        // rediect to source
        Logger.log(`req.body is ${JSON.stringify(req.body)}`); // { username: 'sa', password: 'yueyu521', remember: 'on' }
        Logger.log(`req.query is ${JSON.stringify(req.query)}`); // { r: '/test/aaa' }
        Logger.log(`req.cookies is ${JSON.stringify(req.cookies)}`);

        Logger.log('req.signedCookies is');
        Logger.log(req.signedCookies);
        res.json({});
    },
};
