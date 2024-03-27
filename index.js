require('dotenv').config(); // Load env variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./src/utils/initDB');
const { accountRoutes } = require('./src/routes/accountRoutes');


const app = express();

// Connect to DB
connectToDatabase();

/** -------------------------------------------Main middlewares----------------------------------------- */
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
/**----------------------------------------------------------------------------------------------------- */


/** -------------------------------------------Account------------------------------------------------- */
app.use('/api/accounts', accountRoutes);


/**--------------------------------------------Start server--------------------------------------------- */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(
    PORT,
    HOST,
    () => {
        console.log(`Server started : ${PORT}`);
    }
)