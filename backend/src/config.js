const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
        port: process.env.PORT,
        jwtSec: process.env.JWT_SEC,
        passSec: process.env.PASS_SEC,
        dbHost: process.env.DB_HOST,
        dbUser: process.env.DB_USER,
        dbName: process.env.DB_NAME,
        dbPass: process.env.DDB_PASSWORD,
    },
};
