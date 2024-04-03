const User = require("../models/User");

module.exports = {
    getAllAccounts: async(req, res) => {
        return User.findAll();
    },

    getAccountById: async(req, res) => {
        console.log(req.query);
        const accountId = req.params.id;
        return User.findByPk(accountId);
    },
}