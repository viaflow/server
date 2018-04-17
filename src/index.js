import app from './app';

const { PORT = 8080 } = process.env;
app.listen(PORT, () => Logger.log(`Listening on port ${PORT}`));
