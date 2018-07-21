export const Index = {
    path: '/index',
    method: 'get',
    auth: true,
    handler: async (req, res) => {
        res.render('dashboard/index',{})
    },
};
