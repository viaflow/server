import { pluginsAll, pluginInfo } from '../services/plugin.service';
// import { pluginAdd } from '../services/plugin.service';
import { nodeAdd } from '../services/flow.service';

export const PluginsWithParams = {
    path: '/list/:flowId?/:parentId?/:signal?',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        const plugins = await pluginsAll(undefined, true);

        res.render('plugin/list', {
            plugins,
            path: req.params.flowId !== undefined && req.params.parentId !== undefined && req.params.signal !== undefined ? `${req.params.flowId}/${req.params.parentId}/${req.params.signal}` : '',
        });
    },
};

export const DetailGet = {
    path: '/detail/:pluginId/:flowId?/:parentId?/:signal?',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        const plugin = await pluginInfo(req.params.pluginId);
        res.render('plugin/detail', plugin);
    },
};

export const DetailPost = {
    path: '/detail/:pluginId/:flowId/:parentId/:signal',
    method: 'post',
    auth: true,
    handler: async (req, res) => {
        const node = await nodeAdd(
            req.params.flowId,
            req.params.parentId,
            req.params.signal,
            req.params.pluginId,
            req.body,
        );

        res.json(node);
    },
};

// export const InitTest = {
//     path: '/test',
//     method: 'get',
//     handler: async (req, res) => {
//         const result = await pluginAdd('https://github.com/viaflow/plugin-http.git', 'http-test');
//         // pluginAdd('https://github.com/viaflow/plugin-http.git, 'agent1');
//         res.json(result);
//     },
// };
