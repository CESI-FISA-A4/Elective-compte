const User = require("../models/User");

module.exports = {
    getAllAccounts: async(req, res) => {
        return User.findAll();
    },

    getAccountById: async(req, res) => {
        const id = req.params.id;
        const { userId, roleLabel } = req.query;

        // admin? Your account?  
        if (roleLabel != "admin" && userId != id) {
            return res.status(403).send("access forbidden");
        }

        return User.findByPk(id);
    },

    patchAccountById: async(req, res) => { return "patchAccountById" },

    suspendAccountById: async(req, res) => { return "suspendAccountById" }
}