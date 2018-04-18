import jwt from 'jsonwebtoken';

const routes = Router();

// token generate
routes.post('/generate', (req, res) => {
    const { username, password, timestamp } = req.body;
    // TODO:use database instead of hard code.
    if (true) {
        Logger.log(username);
        Logger.log(password);
        Logger.log(timestamp);
        res.json({
            result: 'ok',
            token: jwt.sign({
                username: 'Tuo',
                nickname: 'Sirius',
                avatar: '',
                email: 'cealer@foxmail.com',
                group: 'users',
            }, app.get('cronflow_token'), {
                expiresIn: '7d',
                algorithm: 'HS512',
            }),
        });
    }
});

export default routes;
