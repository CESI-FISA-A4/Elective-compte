require('dotenv').config(); // Load env variables

const { accountRoutes } = require('./src/routes/accountRoutes');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const { connectToDatabase } = require('./src/utils/initDB');

const fastify = require('fastify')();


// Connect to DB
connectToDatabase();


/** -------------------------------------------Account------------------------------------------------- */
fastify.register(accountRoutes, { prefix: '/api/accounts' });

/**--------------------------------------------Start server--------------------------------------------- */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

fastify.listen({ port: PORT, host: HOST }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server started : ${PORT}`);
})