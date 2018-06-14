import cookieParser from 'cookie-parser';

app.use(cookieParser(NODE_ENV.cookieSecret || 'cronflow'));
