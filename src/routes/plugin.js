import fs from 'fs';
import { join } from 'path';
import { pluginInfo } from '../services/plugin.service';

export const Plugins = {
    path: '/list',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        const plugins = [];
        const pluginsPath = join(process.cwd(), './plugins');
        // 遍历plugins的文件夹中的文件夹
        const dirs = [];
        fs.readdirSync(pluginsPath).forEach((item) => {
            const dirPath = join(pluginsPath, item);
            if (fs.statSync(dirPath).isDirectory()) {
                dirs.push(dirPath);
            }
        });
        // 便利文件夹，读取插件列表
        Logger.log(dirs);
        dirs.forEach((plgPath) => {
            // try {
            plugins.push(pluginInfo(plgPath));
            // } catch (e) {
            //     Logger.error(`Plugin has error cannot be loaded: ${e.message}`);
            // }
        });
        res.json(plugins);
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