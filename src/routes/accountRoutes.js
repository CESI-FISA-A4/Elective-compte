// Account routes
const express = require('express');
const { getAllAccounts, getAccountById } = require('../views/accountViews');

const accountRoutes = express.Router();

/** -------------------------------------------Routes--------------------------------------------------- */

accountRoutes.get('/', getAllAccounts);
accountRoutes.get('/:id', getAccountById);


module.exports = { accountRoutes };