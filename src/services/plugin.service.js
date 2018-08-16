import { spawnSync } from 'child_process';
import { isExistsFile, isExistsDir } from '../../utils/fs.utils';
import { applicationConf } from '../init/config';

/**
 * 获取插件信息根据绝对路径
 * @param {String} path 插件的绝对路径
 */
export const pluginInfo = (path) => {
    // 首先判断有没有package.json和index.js，没有就抛异常
    if (!isExistsFile(`${path}/package.json`) || !isExistsFile(`${path}/${applicationConf.pluginEntryFile}`)) {
        throw new Error('missing file of plugin');
    }

    // 如果没有编译，使用babel编译
    if (!isExistsDir(`${path}/${applicationConf.pluginCompiledDir}`)) {
        Logger.log('plugin not build, need run babel build command.');
        const child = spawnSync(applicationConf.babelCmd, applicationConf.babelParams, {
            cwd: path,
        });

        Logger.log(_.trimEnd(child.stdout.toString()));

        const babelError = _.trim(child.stderr.toString());
        if (!_.isEqual(babelError, '') && child.stdout.toString().indexOf('packages from') === -1) {
            // throw npm error
            throw new Error(`babel build error: ${babelError}`);
        }
    }


    // 如果不存在node_modules，执行npm install
    if (!isExistsDir(`${path}/${applicationConf.pluginCompiledDir}/node_modules`)) {
        Logger.trace('node_modules not exists, need run npm install command.');
        const child = spawnSync(applicationConf.npmCmd, applicationConf.npmParams, { cwd: `${path}/${applicationConf.pluginCompiledDir}/` });
        Logger.log(_.trimEnd(child.stdout.toString()));
        const npmError = _.trim(child.stderr.toString());
        if (!_.isEqual(npmError, '')) {
            // throw npm error
            throw new Error(`npm install error: ${npmError}`);
        }
    }

    // 引用插件，检查接口完成性
    // eslint-disable-next-line
    const { Define, Execute } = require(`${path}/${applicationConf.pluginCompiledDir}/index.js`);

    const pluginDefineType = typeof Define;

    if (!(pluginDefineType === 'object' || pluginDefineType === 'function')) {
        throw new Error(`Plugin Interface 'Define' has wrong type ${typeof Define}`);
    }

    if (!(typeof Execute === 'function')) {
        throw new Error(`Plugin Interface 'Execute' has wrong type ${typeof Execute}`);
    }

    const plugin = pluginDefineType === 'object' ? Define : Define();

    // eslint-disable-next-line
    const packageInfo = require(`${path}/package.json`);

    const result = {
        name: plugin.name,
        desc: plugin.desc,
        fields: plugin.fields,
        path: _.last(path.split('/')),
        repo: _.get(packageInfo, 'homepage', '#'), // packageInfo.homepage,
        author: _.get(packageInfo, 'author', 'Guo Tuo <guotuo1024@gmail.com>'),
        issue: _.get(packageInfo, 'bugs.url', '#'),
    };
    return result;
};

/**
 * 下载新的插件根据git地址
 * @param {String} repoUri 插件的git地址
 */
export const downloadPlugin = (repoUri) => {
    Logger.log(repoUri);
    return repoUri;
};
