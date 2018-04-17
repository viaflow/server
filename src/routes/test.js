const routes = Router();

routes.get('/', (req, res) => {
    res.render('index', { title: 'Express Babel' });
});

routes.get('/list', (req, res, next) => {
    const { title } = req.query;

    if (title == null || title === '') {
        next(new Error('The "title" parameter is required'));
        return;
    }

    res.render('index', { title });
});

export default routes;
