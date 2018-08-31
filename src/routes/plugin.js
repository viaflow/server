import { body, validationResult } from 'express-validator/check';
import { pluginsAll, pluginInfo, pluginAdd } from '../services/plugin.service';

import { nodeAdd } from '../services/flow.service';

export const PluginsWithParams = {
    path: '/list/:flowId?/:parentId?/:signal?',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        const plugins = await pluginsAll(undefined, true);

        res.render('plugin/list', {
            plugins,
            layout: 'layout',
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

export const PluginAdd = {
    path: '/add',
    method: 'post',
    validator: [
        body('repo').not().isEmpty().withMessage('Flow name is required.'),
    ],
    auth: true,
    handler: async (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg).array();
        if (errors.length > 0) {
            // TODO: 这里需要handle一下
            Logger.error(errors);
            res.status(503).json(errors);
            return;
        }
        const { repo, rename } = req.body;
        const plgInfo = await pluginAdd(repo, rename);
        Logger.log(plgInfo);
        res.json(plgInfo.dataValues);
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
