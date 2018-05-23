const router = new Router();

// router.get('/login', (req, res) => {
//     // console.log(req.query.r);
//     res.render('login', {});
// });
const method = 'get';

const testFunc = (req, res) => {
    Logger.log(req.query.r);
    res.render('login', {});
};

router[method]('/login', testFunc);

// router.post('/login', (req, res) => {

// });

export default router;
