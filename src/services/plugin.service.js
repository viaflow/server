import fs from 'fs';
/**
 * 获取插件信息根据绝对路径
 * @param {String} path 插件的绝对路径
 */
export const pluginInfo = (path) => {
    // 获取入口文件

};

/**
 * 下载新的插件根据git地址
 * @param {String} repoUri 插件的git地址
 */
export const downloadPlugin = (repoUri) => {
    Logger.log(repoUri);
    return repoUri;
};
