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

export const flowActived = raw => Flow.findAll({
    where: {
        flowState: 'ACTIVE',
        triggerType: 'active',
    },
    raw,
});

export const flowRegistration = (flowId, cron, options) => {
    // destory old CronFlow and release memory
    if (CronFlow[`c_${flowId}`]) {
        CronFlow[`c_${flowId}`].stop();
        CronFlow[`c_${flowId}`] = undefined;
    }
    // registtration it
    CronFlow[`c_${flowId}`] = new CronJob({
        cronTime: cron,
        ...options,
        async onTick() {
            Logger.log(`c_${flowId} triggered`);
            // generate to redis with lpush
            await redis.lpush('croned', `c_${flowId}_${now()}`);
        },
    });
    CronFlow[`c_${flowId}`].start();
    Logger.log(`CronFlow ${flowId} registed. ${cron}`);
    return CronFlow.length;
};

export const flowRegisterOnSystemInit = async () => {
    const allActivedFlows = await flowActived(true);
    let result = 0;
    allActivedFlows.forEach((flow) => {
        try {
            flowRegistration(flow.flowId, flow.cron, {
                runOnInit: false,
                timeZone: flow.flowTimezone,
            });
            result += 1;
        } catch (e) {
            Logger.error(`Flow ${flow.flowId} cannot be registed, ${e.message}`);
        }
    });
    return result;
};

export const flowUpdateById = async (entity) => {
    const flow = await flowById(entity.flowId);
    const hookFlag = (entity.cron && entity.cron !== flow.cron) || (entity.flowState && entity.flowState !== flow.flowState);
    entity.updatedAt = new Date();
    entity.updater = 1;
    const result = await flow.update(entity, { fields: ['flowName', 'flowTags', 'triggerType', 'cron', 'flowTimezone', 'flowState', 'flowDescription', 'updatedAt', 'updater'] });

    // if cron expression or cron job state changed, it should do re-register or cancel action.
    // TODO: Think about the sequlize hook 'afterUpdate' maybe can handling it more perfect
    if (!hookFlag) {
        Logger.log('Job need not re-register.');
        return result;
    }
    // If not, destory old CronFlow and release memory
    flowRegistration(result.dataValues.flowId, result.dataValues.cron, { runOnInit: false, timeZone: result.dataValues.flowTimezone });

    return result;
};
