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

    patchAccountById: async(req, res) => {
        const id = req.params.id;
        const { userId, roleLabel } = req.query;

        const keysAvailable = ['firstname', 'lastname', 'suspend', 'address', 'imageUrl'];
        const fieldsToUpdate = req.body;

        // admin? Your account?  
        if (roleLabel != "admin" && userId != id) return res.status(403).send("access forbidden");

        const user = await User.findByPk(id);

        if (!user) return res.status(404).send("user not found");

        for (const key in fieldsToUpdate) {
            if (Object.hasOwnProperty.call(fieldsToUpdate, key) && keysAvailable.find((keyAvailable) => keyAvailable == key)) {
                if (key === 'suspend' && roleLabel != admin) return res.status(403).send("you can't update the suspend field");

                user[key] = fieldsToUpdate[key];
            }
        }

        user.save();

        return user;
    },

    suspendAccountById: async(req, res) => {
        const id = req.params.id;
        const { userId, roleLabel } = req.query;

        // admin? Your account?  
        if (roleLabel != "admin" && userId != id) return res.status(403).send("access forbidden");

        const user = await User.findByPk(id);

        if (!user) return res.status(404).send("user not found");

        user.suspend = true;
        user.save();

        return `Account n°${userId} suspend successfully`;
    }
}