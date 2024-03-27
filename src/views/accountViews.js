module.exports = {
    getAllAccounts: async(req, res) => {
        try {
            return res.status(200).json("allProducts");
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAccountById: async(req, res) => {
        const accountId = req.params.id; // Assuming you're passing the product ID through the URL params

        try {
            return res.status(200).json("product");
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}