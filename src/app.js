import init from './init';

init.forEach((i) => { i(); });

app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, '../public')));


// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500).render('error', {
        message: err.message,
    });
});

export default app;
