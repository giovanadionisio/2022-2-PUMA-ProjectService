/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const db = require('./dbconfig/dbConfig');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.json({
    Project: 'Puma',
    Service: 'Project-Service',
  });
});

app.listen(3000);
