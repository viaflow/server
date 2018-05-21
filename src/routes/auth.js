const router = new Router();

router.get('/login', (req, res, next) => {
    // console.log(req.query.r);
    res.render('login', {});
});

export default router;
