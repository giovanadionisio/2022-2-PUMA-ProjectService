const projectRoutes = require('./ProjectRoutes');

module.exports = (app) => {
  app.use('/', [projectRoutes]);
};
