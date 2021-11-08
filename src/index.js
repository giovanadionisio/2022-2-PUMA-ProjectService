/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./config/environment.config');
const configRoutes = require('./routes/router');

// eslint-disable-next-line no-unused-vars
const db = require('../dbconfig/dbConfig');

environment.configEnv();

const app = express();
app.disable('x-powered-by');
const corsOptions = {
  origin: `${global.URL_API}`,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

configRoutes(app)

app.listen(3000);
