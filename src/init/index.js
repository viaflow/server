import express from 'express';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import _ from 'lodash';
import colors from 'colors';
import tracer from 'tracer';
import jwt from 'express-jwt';
import { tokenConf } from './config';

// region Global variables initialization
const setGlobal = () => {
    global.express = express;
    global.path = path;
    global.fs = fs;
    global.app = express();
    global.moment = moment;
    global.route = express.Router();
    global._ = _;
    global.NODE_ENV = process.env.NODE_ENV || 'development';
    global.now = () => moment().format('YYYY-MM-DD HH:mm:ss');
    global.CronFlow = {};
};
// endregion

// region Logger module settings, do not use console moudle

/* eslint-disable */
const setLogger = () => {
    const logFormat = '{{level}}_{{title}} {{timestamp}} [{{path}}:{{line}}] {{message}}';

    const logConfig = {
        level: 'log',
        format: [logFormat],
        filters: {
            log: colors.grey,
            trace: colors.magenta,
            debug: colors.blue,
            info: colors.green,
            warn: colors.yellow,
            error: [colors.red, colors.bold],
        },
        dateformat: 'HH:MM:ss',
        preprocess: (data) => {
            switch (data.title) {
                case 'log':
                    data.title += ' ';
                    break;
                case 'info':
                case 'warn':
                    data.title += '@@';
                    break;
                default:
                    data.title += ' ';
                    break;
            }
            data.title = data.title.toUpperCase();
            data.path = data.path.replace(process.cwd(), '').replace('.js', '').replace('.ts', '');
        },
    };

    global.Logger = tracer.colorConsole(logConfig);
    Logger.debug(`
    ################ system booting, start with Logger setup
    ==>> ${now}`);
    if (process.env.NODE_ENV === 'production') {
        tracer.setLevel('log');
    }
};
/* eslint-disable */

// endregion

// region set express server
const setExpress = () => {
    Logger.log('http server setup...')

    // disable x-powerd-by
    app.disable('x-powered-by');

    // set static resources
    app.use(express.static(path.join(process.cwd(), 'public')));

    // set view engine
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
};
// endregion

// region Database module settings
const setDatabase = () => {
    // db settings required from src/inti/db/*.*
    // initialize database information like mongo/mysql or redis...
    Logger.log(`database setup...`);
    const dbSettingsDir = './db';
    const dbFiles = fs.readdirSync(path.join(__dirname, dbSettingsDir));
    dbFiles.forEach(dbf => {
        require(path.join(__dirname, dbSettingsDir, dbf));
    })
}
// endregion

// region express middlewares loader
const setMiddlewares = () => {
    Logger.log(`middlewares setup...`);
    const middlewaresDir = './middlewares';
    const middlewares = fs.readdirSync(path.join(__dirname, middlewaresDir));
    middlewares.forEach(middleware => {
        require(path.join(__dirname, middlewaresDir, middleware));
    })
}
// endregion

// region register custom scripts
const setScripts = () => {
    Logger.log(`custom scripts setup...`);
    const customScriptDir = './customs';
    const customScripts = fs.readdirSync(path.join(__dirname, customScriptDir));
    customScripts.forEach(script => {
        require(path.join(__dirname, customScriptDir, script));
    })
}
// endregion

// region set interceptors(e.g. auth)
const setInterceptors = () => {
    Logger.log(`[Interceptors] setup...`);
}
// endregion

// region register routes
const setRoutes = () => {
    Logger.log(`routings setup...`);
    const routesDir = '../routes';
    const routeFiles = fs.readdirSync(path.join(__dirname, routesDir));
    const routeTable = [];
    routeFiles.forEach(fileName => {
        let prefix = `/${path.basename(fileName, '.js')}`;
        (prefix === '/index') && (prefix = '/');
        const handlers = require(path.join(__dirname, routesDir, fileName));
        const majorKeys = Object.keys(handlers);
        majorKeys.forEach(key => {
            const majorRoute = handlers[key];
            if (!majorRoute.method)
                return;

            (!majorRoute.validator) && (majorRoute.validator = []);

            route[majorRoute.method](`${prefix}${majorRoute.path}`, majorRoute.validator, majorRoute.handler);
            routeTable.push({
                Path: `${prefix}${majorRoute.path}`,
                Method: majorRoute.method,
                Auth: _.has(majorRoute, 'auth') ? majorRoute.auth.toString().toUpperCase() : 'TRUE', // default to true
                Validators: majorRoute.validator.length
            })
        })
    })
    Logger.table(routeTable);
    // jwt setting, express-jwt module must required before app.use(route).
    app.use(
        jwt({
            secret: tokenConf.secret,
            getToken: (req) => {
                return req.cookies[tokenConf.cookieName]
            }
        }).unless({
            path: _.uniq(routeTable.filter((item) => { return item.Auth === 'FALSE' }).map((item) => { return item.Path }))
        })
    );
    app.use(route);
}
// endregion

export default [setGlobal, setLogger, setExpress, setDatabase, setMiddlewares, setScripts, setInterceptors, setRoutes];