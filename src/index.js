import app from './app';

const { PORT = 8080 } = process.env;
app.listen(PORT, () => Logger.log(`Listening on port ${PORT}`));

Logger.log('THIS IS LOG');
Logger.debug('THIS IS DEBUG');
Logger.trace('THIS IS TRACE');
Logger.info('THIS IS INFO');
Logger.warn('THIS IS WARN');
Logger.error('THIS IS ERROR');
