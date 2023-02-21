const express = require('express');

const app = express();

const cors = require('cors');

// eslint-disable-next-line import/no-unresolved
const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const compression = require('compression');

const morgan = require('morgan');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

const authRoutes = require('./routes/auth.routes');
const { sedeRouter } = require('./routes/sede.routes');
const { SpecialityRouter } = require('./routes/speciality.routes');
const { whatsappRouter } = require('./routes/routes.whatsapp');
const { CodeRouter } = require('./routes/code.routes');
const { DoctorRouter } = require('./routes/doctor.routes');

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// add security helmet
app.use(helmet());

// compress responses
app.use(compression());

// log incoming request
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Limit IP requests
const limiter = rateLimit({
    max: 10000,
    windowMs: 1 * 60 * 60 * 1000, // 1 hr
    message: 'Too many requests from this IP',
});

app.use(limiter);

/** Route initialization */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sede', sedeRouter);
app.use('/api/v1/speciality', SpecialityRouter);
app.use('/whatsapp', whatsappRouter);
app.use('/api/v1/code', CodeRouter);
app.use('/api/v1/doctor', DoctorRouter);

// Global error handler
app.use('*', globalErrorHandler);

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
