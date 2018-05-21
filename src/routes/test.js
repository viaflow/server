const routes = Router();

routes.get('/aaa', (req, res) => {
    // res.render('index', { title: 'Express Babel' });

    res.json(req.user);
});

export default routes;
