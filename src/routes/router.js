const projectRoutes = require('./ProjectRoutes');
const subjectRoutes = require('./SubjectRoutes');
const keywordRoutes = require('./KeywordRoutes');

module.exports = (app) => {
  app.use('/', [
    projectRoutes,
    subjectRoutes,
    keywordRoutes,
  ]);
};
