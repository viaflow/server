import jwt from 'jsonwebtoken';

const routes = Router();

routes.get('/aaa', (req, res) => {
    // res.render('index', { title: 'Express Babel' });
    Logger.log(req.user);
    res.json(req.user);
});

routes.get('/token', (req, res) => {
    res.json({
        result: 'ok',
        token: jwt.sign({
            name: 'tuo',
            data: 'gabefbyfaoweuy',
        }, 'jwtsecret', {
            expiresIn: 60 * 60,
        }),
    });
});

export default routes;
