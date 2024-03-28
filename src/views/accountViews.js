module.exports = {
    getAllAccounts: async(req, res) => {
        // data.oui(); // simulate error 500
        return { 'data': 'all accounts' };
    },

    getAccountById: async(req, res) => {
        const accountId = req.params.id; // Assuming you're passing the product ID through the URL params

        return 'account';
    },
}