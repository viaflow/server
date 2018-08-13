import { body, validationResult } from 'express-validator/check';

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

        /*
        {
            "flowName": "名字",
            "flowTags": "cron,active,awef,This is a Tag!,Cool",
            "triggerType": "active",
            "cron": "阿娥无法违法违法",
            "flowTimezone": "Asia/Shanghai",
            "flowDescription": "awef"
        }
        */

        // initialize flow
        const {
            flowName, flowTags, triggerType, cron, flowTimezone, flowDescription,
        } = req.body;
        const entity = {
            flowName, flowTags, triggerType, cron, flowTimezone, flowDescription,
        };
        res.json(entity);
    },
};

export const Flows = {

};
