const Role = require("../models/Role");
const User = require("../models/User");

module.exports = {
    getAllAccounts: async(req, res) => {
        let users = await User.findAll({
            include: [{
              model: Role,
              as: 'role',
              attributes: ['label'],
            }],
          });
        users = users.map((user) => {
            return {
                userId: user.id,
                username: user.username,
                roleLabel: user.role.label,
                firstname: user.firstname,
                lastname: user.lastname,
                imageUrl: user.imageUrl,
                mentorCode: user.mentorCode,
                address: user.address,
                suspend: user.suspend
            }
        });

        return users;
    },

    getAccountById: async(req, res) => {
        const id = req.params.id;
        const { userId, roleLabel } = req.query;

        // admin? Your account?  
        if (roleLabel != "admin" && roleLabel != "salesman" && userId != id) {
            return res.status(403).send("access forbidden");
        }

        let userFound = await User.findByPk(id);

        if(!userFound) return res.status(404).send("user not found");

        let mentorId = userFound.mentorId;
        let mentorFirstname = null;
        let mentorLastname = null;
        if(mentorId){
            let mentor = await User.findByPk(mentorId);
            if(mentor){
                mentorFirstname = mentor.firstname;
                mentorLastname = mentor.lastname;
            }
        }

        return {
            userId: userFound.id,
            firstname: userFound.firstname,
            lastname: userFound.lastname,
            imageUrl: userFound.imageUrl,
            mentorCode: userFound.mentorCode,
            mentorFirstname,
            mentorLastname,
            address: userFound.address
        }
    },

    patchAccountById: async(req, res) => {
        const id = req.params.id;
        const { userId, roleLabel } = req.query;

        const keysAvailable = ['firstname', 'lastname', 'address', 'imageUrl'];
        const fieldsToUpdate = req.body;

        // admin? Your account?  
        if (roleLabel != "admin" && roleLabel != "salesman" && userId != id) return res.status(403).send("access forbidden");

        const user = await User.findByPk(id);

        if (!user) return res.status(404).send("user not found");

        for (const key in fieldsToUpdate) {
            if (Object.hasOwnProperty.call(fieldsToUpdate, key) && keysAvailable.find((keyAvailable) => keyAvailable == key)) {
                user[key] = fieldsToUpdate[key];
            }
        }

        user.save();

        return user;
    },

    mentorAccountByCode: async(req, res) => {
        const code = req.params.code;

        const { userId } = req.query;

        const user = await User.findOne({
            where: {
                ["mentorCode"]: code
            }
        });

        if(!user || user.suspend || user.id == userId) return res.status(404).send("account not found");

        if(user.mentorId) return res.status(403).send("this account has already been targeted");

        user.mentorId = userId;
        user.save();

        return `Account n°${user.id} mentor by account n°${userId}`;
    },

    suspendAccountById: async(req, res) => {
        const id = req.params.id;
        const { userId, roleLabel } = req.query;

        // admin? Your account?  
        if (roleLabel != "admin" && roleLabel != "salesman" && userId != id) return res.status(403).send("access forbidden");

        const user = await User.findByPk(id);

        if (!user) return res.status(404).send("user not found");

        user.suspend = true;
        user.save();

        return `Account n°${userId} suspend successfully`;
    },

    activateAccountById: async(req, res) => {
        const id = req.params.id;
        const { userId } = req.query;

        const user = await User.findByPk(id);

        if (!user) return res.status(404).send("user not found");

        user.suspend = false;
        user.save();

        return `Account n°${userId} activated successfully`;
    }
}