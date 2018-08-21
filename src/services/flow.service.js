import { Op } from 'sequelize';
import { join } from 'path';
import { Flow, Node } from '../models';
import { pluginInfo } from './plugin.service';

export const flowAdd = (entity) => {
    const defaults = {
        flowNodes: 0,
        flowState: 'INIT',
        triggerCount: 0,
        createdAt: new Date(),
        creator: 1,
        updatedAt: new Date(),
        updater: 1,
    };

    return Flow.create(Object.assign(defaults, entity));
};

export const flowById = (flowId, raw = false) => Flow.findOne({
    where: {
        flowId,
    },
    raw,
});

export const flowByName = (flowName, raw = false) => Flow.findAll({
    where: {
        flowName: {
            [Op.like]: `%${flowName}%`,
        },
    },
    raw,
});

/**
 * 为Flow新增Node
 * @param {Number} flowId
 * @param {Number} parentId
 * @param {Enum} signal
 * @param {String} plugin
 * @param {Object} configurations
 */
export const nodeAdd = async (flowId, parentId, signal, plugin, configurations) => {
    const currentNodes = await Node.findAll({
        attributes: ['sequence'],
        where: {
            flowId,
            parentId,
        },
        order: [['sequence', 'DESC']],
        raw: true,
    });
    let sequence = 0;
    if (currentNodes.length !== 0) {
        sequence = currentNodes[0].sequence + 1;
    }
    const entity = {
        flowId,
        parentId,
        signal,
        plugin,
        sequence,
        configurations: JSON.stringify(configurations),
        creator: 1,
        createdAt: new Date(),
        updater: 1,
        updatedAt: new Date(),
    };

    return Node.create(entity);
};

// const recurrence = () => {

// };

export const nodeByFlow = async (flowId, isFormat = false) => {
    // 当前flow的Node
    let currentNodes = await Node.findAll({
        where: {
            flowId,
        },
        order: [['parentId', 'ASC'], ['sequence', 'ASC']],
        raw: true,
    });

    if (isFormat) {
        currentNodes.forEach((item) => {
            // look for pluginInfo
            item.pluginInfo = pluginInfo(join(process.cwd(), `./plugins/${item.plugin}`));// eslint-disable-line
            // find children
            item.children = currentNodes.filter(node => node.parentId === item.nodeId);// eslint-disable-line
        });
        // Logger.log(JSON.stringify(currentNodes.filter(n => n.parentId === 0)));
        currentNodes = currentNodes.filter(n => n.parentId === 0);
    } else {
        currentNodes.forEach((item) => {
            // look for pluginInfo
            item.pluginInfo = pluginInfo(join(process.cwd(), `./plugins/${item.plugin}`));// eslint-disable-line
        });
    }
    return currentNodes;
};
