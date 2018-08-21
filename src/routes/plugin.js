import fs from 'fs';
import { join } from 'path';
import { pluginInfo } from '../services/plugin.service';
import { nodeAdd } from '../services/flow.service';

export const PluginsWithParams = {
    path: '/list/:flowId?/:parentId?/:signal?',
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
        dirs.forEach((plgPath) => {
            try {
                plugins.push(pluginInfo(plgPath));
            } catch (e) {
                Logger.error(`Plugin has error cannot be loaded: ${e.message}`);
            }
        });

        res.render('plugin/list', {
            plugins,
            path: req.params.flowId !== undefined && req.params.parentId !== undefined && req.params.signal !== undefined ? `${req.params.flowId}/${req.params.parentId}/${req.params.signal}` : '',
        });
    },
};

export const DetailGet = {
    path: '/detail/:path/:flowId?/:parentId?/:signal?',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        const pluginPath = join(process.cwd(), `./plugins/${req.params.path}`);
        const plugin = pluginInfo(pluginPath);
        Logger.log(plugin);
        res.render('plugin/detail', plugin);
    },
};

export const DetailPost = {
    path: '/detail/:path/:flowId/:parentId/:signal?',
    method: 'post',
    auth: true,
    handler: async (req, res) => {
        const node = await nodeAdd(
            req.params.flowId,
            req.params.parentId,
            req.params.signal,
            req.params.path, req.body,
        );

        res.json(node);
    },
};
