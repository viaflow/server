import { body, param, validationResult } from 'express-validator/check';
import { flowAdd, flowById, nodeByFlow } from '../services/flow.service';

export const AddInit = {
    path: '/add',
    method: 'get',
    handler: async (req, res) => {
        res.render('flow/add', {
            title: 'Flow add',
        });
    },
};

export const AddSubmit = {
    path: '/add',
    method: 'post',
    validator: [
        body('flowName').not().isEmpty().withMessage('Flow name is required.'),
        body('cron').not().isEmpty().withMessage('Cron expression is required.'),
    ],
    handler: async (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg).array();

        if (errors.length > 0) {
            // TODO: 这里需要handle一下
            res.json(errors);
            return;
        }

        // initialize flow
        try {
            const {
                flowName, flowTags, triggerType, cron, flowTimezone, flowDescription,
            } = req.body;
            const addResult = await flowAdd({
                flowName, flowTags, triggerType, cron, flowTimezone, flowDescription,
            });

            Logger.log('Flow added...');
            Logger.log(addResult.dataValues);
            res.redirect(`/flow/detail/${addResult.flowId}`);
        } catch (e) {
            Logger.error(e);
            res.json(e);
        }
    },
};


/**
 * flow detail information, add node, edit base information
 * TODO: edit base information
 */
export const FlowDetail = {
    path: '/detail/:id',
    method: 'get',
    validator: [
        param('id').not().isEmpty().isInt()
            .withMessage('Cannot find the detail info'),
    ],
    handler: async (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg).array();

        if (errors.length > 0) {
            // TODO: 这里需要handle一下
            res.json(errors);
            return;
        }


        // flow entity
        const flow = await flowById(req.params.id, true);
        // flow nodes entity
        const nodes = await nodeByFlow(req.params.id, true);

        res.render('flow/detail', { flow, nodes });
    },
};


export const Flows = {

};
