import express from 'express';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import _ from 'lodash';
import colors from 'colors';
import tracer from 'tracer';

// region Global variables initialization
const setGlobal = () => {
    global.express = express;
    global.path = path;
    global.fs = fs;
    global.app = express();
    global.moment = moment;
    global.Router = express.Router;
    global._ = _;
    global.NODE_ENV = process.env.NODE_ENV || 'development';
    global.now = moment().format('YYYY-MM-DD HH:mm:ss');
};
// endregion

// region Logger module settings, do not use console moudle

/* eslint-disable */
const setLogger = () => {
    const logFormat = '{{level}}_{{title}} {{timestamp}} [{{path}}] {{message}}';

    const config = {
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
        dateformat: 'yyyy-mm-dd HH:MM:ss.L',
        preprocess: (data) => {
            switch (data.title) {
                case 'log':
                    data.title += '  ';
                    break;
                case 'info':
                case 'warn':
                    data.title += '@@@';
                    break;
                default:
                    data.title += '  ';
                    break;
            }
            data.title = data.title.toUpperCase();
            data.path = data.path.replace(process.cwd(), '').replace('.js', '').replace('.ts', '');
        },
    };

    global.Logger = tracer.colorConsole(config);
    // const now = new Date().toISOString();
    Logger.debug(`
    ################ system booting, start with Logger setup
    ==>> ${now}`);
    if (process.env.NODE_ENV === 'production') {
        tracer.setLevel('log');
    }
};
/* eslint-disable */

// endregion

// region Database module settings
const setDatabase = () => {
    // db settings required from src/inti/db/*.*
    // initialize database information like mongo/mysql or redis...
    Logger.log(`setting database...`);
    const dbSettingsDir = 'src/init/db';
    const dbFiles = fs.readdirSync(path.join(process.cwd(), dbSettingsDir));
    dbFiles.forEach(dbf => {
        require(path.join(process.cwd(), dbSettingsDir, dbf));
    })
}
// endregion

// region express middlewares loader
const setMiddlewares = () => {
    const middlewaresDir = 'src/init/middlewares';
    const middlewares = fs.readdirSync(path.join(process.cwd(), middlewaresDir));
    middlewares.forEach(middleware => {
        require(path.join(process.cwd(), middlewaresDir, middleware));
    })
}
// endregion

// region register custom scripts
const setScripts = () => {
    const customScriptDir = 'src/init/customs';
    const customScripts = fs.readdirSync(path.join(process.cwd(), customScriptDir));
    customScripts.forEach(script => {
        require(path.join(process.cwd(), customScriptDir, script));
    })
}
// endregion

// region register routes
const setRoutes = () => {
    const routesDir = 'src/routes';
    const routeFiles = fs.readdirSync(path.join(process.cwd(), routesDir));
    routeFiles.forEach(fileName => {
        const prefix = `/${path.basename(fileName, '.js')}`;
        (prefix === '/index') && (prefix = '/');
        const routes = require(path.join(process.cwd(), routesDir, fileName)).default;
        app.use(prefix, routes);
    })
}
// endregion

export default [setGlobal, setLogger, setDatabase, setMiddlewares, setScripts, setRoutes];
