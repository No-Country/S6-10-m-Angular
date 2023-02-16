const express = require('express');

const app = express();

const cors = require('cors');

const authRoutes = require('./routes/auth.routes');

app.use(cors());
app.use(express.json());

/** Route initialization */
app.use('/api/v1/auth', authRoutes);

// Models
const { initModels } = require('./models/initModels');

// Utils
const { db } = require('./utils/database');
const config = require('./config');

// Authenticate database credentials
db.authenticate()
    .then(() => {
        return console.log('---Database authenticated---');
    })
    .catch((err) => {
        return console.log(err);
    });

// Establish models relations
initModels();

// Sync sequelize models
db.sync() // { force: true }
    .then(() => {
        return console.log('---Database synced---');
    })
    .catch((err) => {
        return console.log(err);
    });

// spin up server
const port = config.development.port || 8000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
