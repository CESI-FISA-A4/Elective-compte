// Account routes
const { getAllAccounts, getAccountById, patchAccountById, suspendAccountById, mentorAccountByCode } = require('../views/accountViews');

const accountRoutes = function(instance, opts, next) {
    instance.get('/', getAllAccounts);
    instance.get('/:id', getAccountById);

    instance.patch('/:id', patchAccountById);

    instance.post('/mentor/:code', mentorAccountByCode);
    instance.post('/:id/suspend', suspendAccountById);

    next();
};

module.exports = { accountRoutes };