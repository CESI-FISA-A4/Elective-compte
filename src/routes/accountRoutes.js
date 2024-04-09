// Account routes
const { getAllAccounts, getAccountById, patchAccountById, suspendAccountById, mentorAccountByCode, activateAccountById } = require('../views/accountViews');

const accountRoutes = function(instance, opts, next) {
    instance.get('/', getAllAccounts);
    instance.get('/:id', getAccountById);

    instance.patch('/:id', patchAccountById);

    instance.post('/mentor/:code', mentorAccountByCode);
    instance.post('/:id/suspend', suspendAccountById);
    instance.post('/:id/activate', activateAccountById);

    next();
};

module.exports = { accountRoutes };