// eslint-disable-next-line import/no-unresolved
const express = require('express');

const router = express.Router();
const projectRoutes = require('./ProjectRoutes');

router.get('/', (req, res) => {
  res.json({
    Project: 'Puma',
    Service: 'Project Service'
  });
});

module.exports = (app) => {
  app.use('/', [projectRoutes]);
};
