import fs from 'fs';
import { join } from 'path';

export const Plugins = {
    path: '/list',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        const pluginsPath = join(process.cwd(), './src/plugins');
        // 遍历plugins的文件夹中的文件夹
        const dirs = [];
        fs.readdirSync(pluginsPath).forEach((item) => {
            const dirPath = join(pluginsPath, item);
            if (fs.statSync(dirPath).isDirectory()) {
                dirs.push(dirPath);
            }
        });
        // 便利文件夹，读取插件列表
        dirs.forEach((plgPath) => {
            Logger.log(plgPath);
        });
        res.json(dirs);
    },
};

export const Details = {
    path: '/detail/:id',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        Logger.log(req.params.id);
        res.json('1');
    },
};
