import fs from 'fs';

/**
 * 判断文件是否存在
 * @param {String} path File absolute path
 */
export const isExistsFile = path => fs.existsSync(path) && fs.statSync(path).isFile();

/**
 * 判断文件夹是否存在
 * @param {String} path Directory absolute path
 */
export const isExistsDir = path => fs.existsSync(path) && fs.statSync(path).isDirectory();
