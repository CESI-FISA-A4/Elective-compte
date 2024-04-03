require('dotenv').config(); // Load env variables

const { accountRoutes } = require('./src/routes/accountRoutes');
const { connectToDatabase } = require('./src/utils/initDB');
const { subscribeToApiGateway } = require('./src/utils/registrySubscription');

const fastify = require('fastify')();



// Connect to DB
connectToDatabase();

// Subscribe to API Gateway
subscribeToApiGateway();

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