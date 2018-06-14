export const LoginInit = {
    path: '/login',
    method: 'get',
    handler: (req, res) => {
        res.cookie('app', 'cronflow', { signed: true, expires: new Date(Date.now() + 900000) });
        Logger.log(req.query.r);
        res.render('login', {});
    },
};

export const LoginPost = {
    path: '/login',
    method: 'post',
    handler: (req, res) => {
        // TODO:
        // get fields from form.
        // validate to database.
        // generate jwt
        // save to cookie
        // rediect to source
        Logger.log(`req.body is ${JSON.stringify(req.body)}`); // { username: 'sa', password: 'yueyu521', remember: 'on' }
        Logger.log(`req.query is ${JSON.stringify(req.query)}`); // { r: '/test/aaa' }
        Logger.log(`req.cookies is ${JSON.stringify(req.cookies)}`);
        // Logger.log(`req.signedCookies is ${req.signedCookies}`);
        res.render('login', {});
    },
};

