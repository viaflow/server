export const Index = {
    path: '',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        res.render('dashboard/index', {});
    },
};
