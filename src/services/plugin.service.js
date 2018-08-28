import { spawnSync } from 'child_process';
import { join } from 'path';
import { Plugin } from '../models';
import { isExistsFile, isExistsDir, removeDir } from '../../utils/fs.utils';
import { clone, checkout } from '../../utils/git.utils';
import { applicationConf } from '../init/config';

export const pluginByRepo = (pluginRepo, raw = false) => Plugin.findOne({
    where: {
        pluginRepo,
    },
    raw,
});

export const pluginById = (pluginId, raw = false) => Plugin.findOne({
    where: {
        pluginId,
    },
    raw,
});

/**
 * 获取插件信息根据绝对路径
 * @param {String} path 插件的绝对路径
 */
/* eslint-disable */
const _pluginInfo = (path) => {
    // 引用插件，检查接口完成性
    const { Define } = require(`${path}/index.js`);

    const pluginDefineType = typeof Define;

    const pluginInformation = pluginDefineType === 'object' ? Define : Define();

    const packageInfo = require(`${path}/package.json`);

    const result = {
        fields: pluginInformation.fields,
        author: _.get(packageInfo, 'author', 'Guo Tuo <guotuo1024@gmail.com>'),
        issue: _.get(packageInfo, 'bugs.url', '#'),
    };
    return result;
};
/* eslint-disable */

export const pluginInfo = async (pluginId) => {
    const plugin = await pluginById(pluginId, true);
    return Object.assign(plugin, _pluginInfo(plugin.pluginCompiledPath));
}

export const pluginUpdateById = async (entity) => {
    const plugin = await pluginById(entity.pluginId);
    entity.updatedAt = new Date();
    entity.updater = 1;
    return plugin.update(entity, {
        fields: ['pluginName', 'pluginDesc', 'pluginPath', 'pluginCompiledPath', 'pluginVersion', 'pluginWorkBranch', 'updatedAt', 'updater'],
    });
};

export const pluginsAll = async (pluginName, raw = false) => {
    const condition = pluginName ? { pluginName } : {};
    const plugins = await Plugin.findAll({
        where: condition,
        raw,
    });
    const result = [];
    plugins.forEach((plg) => {
        result.push(Object.assign(plg, _pluginInfo(plg.pluginCompiledPath)));
    });
    return result;
};

/**
 * 下载新的插件根据git地址
 * @param {String} repoUri 插件的git地址
 * @param {String} rename 下载到本地的地址
 * @param {Object} options 扩展选项
 */
export const pluginAdd = (repoUri, rename, options = { mode: 'add' }) => {
    const dirName = rename || _.trim(repoUri.split('/')[repoUri.split('/').length - 1], '.git');
    const cwd = join(process.cwd(), `./plugins/${dirName}`);
    

    // remove old version
    if (options.mode !== 'add') {
        removeDir(cwd);
    }
    // git clone && checkout
    clone(repoUri, rename);
    checkout(cwd);
    // 首先判断有没有package.json和index.js，没有就抛异常
    if (!isExistsFile(`${cwd}/package.json`) || !isExistsFile(`${cwd}/index.js`)) {
        throw new Error('missing file of plugin');
    }

    // babel build
    if (!isExistsDir(`${cwd}/${applicationConf.pluginCompiledDir}`)) {
        Logger.trace('plugin not build, need run babel build command.');
        const child = spawnSync(applicationConf.babelCmd, applicationConf.babelParams, {
            cwd,
        });

        Logger.trace(_.trimEnd(child.stdout.toString()));

        const babelError = _.trim(child.stderr.toString());
        if (!_.isEqual(babelError, '') && child.stdout.toString().indexOf('packages from') === -1) {
            // throw npm error
            throw new Error(`babel build error: ${babelError}`);
        }
    }

    // npm install
    if (!isExistsDir(`${cwd}/${applicationConf.pluginCompiledDir}/node_modules`)) {
        Logger.trace('node_modules not exists, need run npm install command.');
        const child = spawnSync(applicationConf.npmCmd, applicationConf.npmParams, { cwd: `${cwd}/${applicationConf.pluginCompiledDir}/` });
        Logger.trace(_.trimEnd(child.stdout.toString()));
        const npmError = _.trim(child.stderr.toString());
        if (!_.isEqual(npmError, '')) {
            // throw npm error
            throw new Error(`npm install error: ${npmError}`);
        }
    }

    // 引用插件，检查基础信息
    // eslint-disable-next-line
    const { Define, Execute } = require(`${cwd}/${applicationConf.pluginCompiledDir}/index.js`);

    const pluginDefineType = typeof Define;

    if (!(pluginDefineType === 'object' || pluginDefineType === 'function')) {
        throw new Error(`Plugin Interface 'Define' has wrong type ${typeof Define}`);
    }

    if (!(typeof Execute === 'function')) {
        throw new Error(`Plugin Interface 'Execute' has wrong type ${typeof Execute}`);
    }

    const pluginInformation = pluginDefineType === 'object' ? Define : Define();
    // eslint-disable-next-line
    const packageInfo = require(`${cwd}/package.json`);

    if (options.mode === 'add') {
        // 存到数据库里
        return Plugin.create({
            pluginName: pluginInformation.name,
            pluginDesc: pluginInformation.desc,
            pluginRepo: repoUri,
            pluginTargetDir: rename,
            pluginPath: cwd,
            pluginCompiledPath: `${cwd}/${applicationConf.pluginCompiledDir}`,
            pluginVersion: _.get(packageInfo, 'version', '0.0.0'),
            pluginWorkBranch: 'master', // master as default
            createdAt: new Date(),
            creator: 1,
            updatedAt: new Date(),
            updater: 1,
        });
    }
    if (options.mode === 'update') {
        return pluginUpdateById({
            pluginName: pluginInformation.name,
            pluginDesc: pluginInformation.desc,
            pluginRepo: repoUri,
            pluginTargetDir: rename,
            pluginPath: cwd,
            pluginCompiledPath: `${cwd}/${applicationConf.pluginCompiledDir}`,
            pluginVersion: _.get(packageInfo, 'version', '0.0.0'),
            pluginWorkBranch: 'master', // master as default
            updatedAt: new Date(),
            updater: 1,
        });
    }
    throw new Error('mode cannot matched in system.');
};

// /**
//  * Re download/install deps/build plugin
//  * @param {Plugin} Plugin model entity
//  */
// export const refreshPlugin = (pluginId) => {
//     Logger.log(pluginEntity);
//     // delete plugin and re-add

//     return pluginEntity;
// };
