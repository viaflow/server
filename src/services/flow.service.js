import { Op } from 'sequelize';
import { Flow } from '../models';

export const flowAdd = (entity) => {
    const defaults = {
        flowNodes: 0,
        flowState: 'INIT',
        triggerCount: 0,
        createdAt: new Date(),
        createdUser: 1,
        updatedAt: new Date(),
        updatedUser: 1,
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
