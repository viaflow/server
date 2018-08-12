import { spawnSync } from 'child_process';
import { isExistsFile, isExistsDir } from '../../utils/fs.utils';
/**
 * 获取插件信息根据绝对路径
 * @param {String} path 插件的绝对路径
 */
export const pluginInfo = (path) => {
    // 首先判断有没有package.json和index.js，没有就抛异常
    if (!isExistsFile(`${path}/package.json`) || !isExistsFile(`${path}/index.js`)) {
        throw new Error('missing file of plugin');
    }
    // 如果不存在node_modules，执行npm install
    if (!isExistsDir(`${path}/node_modules`)) {
        Logger.trace('node_modules not exists, need run npm install command.');
        const child = spawnSync('npm', ['i', '--registry=https://registry.npm.taobao.org'], { cwd: `${path}/` });
        Logger.log(child.stdout.toString());
        const npmError = _.trim(child.stderr.toString());
        if (!_.isEqual(npmError, '')) {
            // throw npm error
            throw new Error(`npm install error: ${npmError}`);
        }
    }
    // 引用插件，检查接口完成性
    // eslint-disable-next-line
    const { Define, Execute, Test } = require(`${path}/index.js`);

    const pluginDefineType = typeof Define;

    if (!(pluginDefineType === 'object' || pluginDefineType === 'function')) {
        throw new Error(`Plugin Interface 'Define' has wrong type ${typeof Define}`);
    }

    if (!(typeof Execute === 'function')) {
        throw new Error(`Plugin Interface 'Execute' has wrong type ${typeof Execute}`);
    }

    const plugin = pluginDefineType === 'object' ? Define : Define();

    Logger.log(plugin);

    // eslint-disable-next-line
    const packageInfo = require(`${path}/package.json`);

    const result = {
        name: plugin.name,
        desc: plugin.desc,
        fields: plugin.fields,
        repo: packageInfo.homepage,
        author: packageInfo.author,
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
