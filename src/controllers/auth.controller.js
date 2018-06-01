
class AuthController {
    constructor() {

    }

    static loginInit(req, res) {
        Logger.log(req.query.r);
        res.render('login', {});
    }

    loginHandler(req, res) {

    }
}

export default AuthController;
