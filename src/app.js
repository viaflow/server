
import init from './init';

init.forEach((i) => { i(); });

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
