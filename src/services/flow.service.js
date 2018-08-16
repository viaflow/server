import { Op } from 'sequelize';
import { Flow, Node } from '../models';

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
        signal: parseInt(parentId, 0) === 0 ? 'ANY' : signal,
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
