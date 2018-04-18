const routes = Router();

// auth interceptor
routes.all('/aaa', (req, res, next) => {
    Logger.log(req.user);
    res.json(req.user);
    // next();
    // Logger.trace(req.originalUrl);
    // Logger.trace(req.baseUrl);
    // Logger.trace(req.path);
    // const token = req.body.cf_token || req.query.cf_token || req.headers['x-access-token'];
    // if (token) {
    //     // 验证token
    //     jwt.verify(token, app.get('mysecret'), (err, decode) => {
    //         if (err) {
    //             return res.json({ success: false, message: '无效的token.' });
    //         }
    //         req.jwted = decode;
    //         next();
    //     });
    // } else {
    //     // 跳转到登录页面
    //     res.json({ message: 'error' });
    // }


    // res.render('index', { title: 'Express Babel' });
});

export default routes;
