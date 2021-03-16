const dotenv = require('dotenv');
const path = require('path');
const envFilePath = path.join(process.cwd(), '.env');
dotenv.config({ path: envFilePath });
const env = {
    app: {
        host: process.env['APP_HOST'],
        port: Number(process.env['APP_PORT']),
        apiKey: process.env['APIKEY'],
        apiSecret: process.env['APISECRET'],
        applicationId: process.env['APPLICATIONID'],
        ngrokUrl: process.env['APP_NGROK_URL'],
    },
    db: {
        host: process.env['DB_HOST'],
        user: process.env['DB_USER'],
        password: process.env['DB_PASSWORD'],
        database: process.env['DB_DATABASE'],
        debug: process.env['DB_DEBUG'],
    },
};
module.exports = env;
