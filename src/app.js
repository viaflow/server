import init from './init';

init.forEach((i) => {
    i();
});

// ignore .map request
app.use((err, req, res, next) => {
    if (req.path.match(/\.map$/i)) {
        Logger.log(req.originalUrl);
        res.send('');
    } else next();
});

// Catch Unauthorized Error
app.use((err, req, res, next) => {
    Logger.log(req.originalUrl);
    if (err.name === 'UnauthorizedError') {
        res.redirect(307, `/auth/login?r=${req.originalUrl}`);
        // res.status(401).send('invalid token...');
    } else {
        next();
    }
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res) => {
    // eslint-disable-line no-unused-vars
    res.status(err.status || 500).render('error', {
        message: err.message,
    });
});

export default app;
