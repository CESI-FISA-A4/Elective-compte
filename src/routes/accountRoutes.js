// Account routes
const { getAllAccounts, getAccountById } = require('../views/accountViews');

const accountRoutes = function(instance, opts, next) {
    instance.get('/', getAllAccounts);

    instance.get('/:id', getAccountById);

    next();
};

module.exports = { accountRoutes };