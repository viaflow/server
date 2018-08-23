import { Op } from 'sequelize';
import { join } from 'path';
import { CronJob } from 'cron';
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

export const flowUpdateById = async (entity) => {
    const flow = await flowById(entity.flowId);
    const hookFlag = (entity.cron && entity.cron !== flow.cron) || (entity.flowState && entity.flowState !== flow.flowState);
    entity.updatedAt = new Date();
    entity.updater = 1;
    const result = await flow.update(entity, { fields: ['flowName', 'flowTags', 'triggerType', 'cron', 'flowTimezone', 'flowState', 'flowDescription', 'updatedAt', 'updater'] });

    // if cron expression or cron job state changed, it should do re-register or cancel action.
    // TODO: Think about the sequlize hook 'afterUpdate' maybe can handling it more perfect
    if (hookFlag) {
        // destory old CronFlow and release memory
        let currentJob = CronFlow[`c_${result.dataValues.flowId}`];
        if (currentJob) {
            currentJob.stop();
            currentJob = undefined; // V8'll release memory by its GC
        }

        if (result.dataValues.flowState === 'ACTIVE') {
            // Re-register job from memory if the state is ACTIVE only
            CronFlow[`c_${result.dataValues.flowId}`] = new CronJob({
                cronTime: result.dataValues.cron,
                timeZone: result.dataValues.flowTimezone,
                runOnInit: false,
                async onTick() {
                    Logger.log(`c_${result.dataValues.flowId} triggered`);
                    // generate to redis with lpush
                    await redis.lpush('croned', `c_${result.dataValues.flowId}`);
                },
            });
        }
    }
    const test = await redis.lpush('croned', `c_${result.dataValues.flowId}`);
    Logger.log(test);
    return result;
};
