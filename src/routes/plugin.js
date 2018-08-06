import fs from 'fs';
import { join } from 'path';

export const Plugins = {
    path: '/list',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        const pluginsPath = join(process.cwd(), './src/plugins');
        // 遍历plugins的文件夹中的文件夹
        const list = fs.readdirSync(pluginsPath);
        list.forEach((item) => {
            Logger.log(fs.statSync(join(pluginsPath, item)).isDirectory());
        });
        res.json(list);
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
