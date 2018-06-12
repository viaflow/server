export const LoginInit = {
    path: '/login',
    method: 'get',
    handler: (req, res) => {
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
        
    },
};

