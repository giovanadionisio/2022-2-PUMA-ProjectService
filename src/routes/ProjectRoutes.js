
// eslint-disable-next-line import/no-unresolved
const express = require('express');

const routes = express.Router();
const db = require('../../dbconfig/dbConfig');
const functions = require('../utils/functions');
const projectController = require('../controller/ProjectController');

routes.get('/', (req, res) => {
  res.json({
    Project: 'Puma',
    Service: 'Project Service',
  });
});

// TODO: Falta tratamento dos dados
routes.post('/project/create', (req, res) => {
  projectController.addProject(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

// TODO: check if the records already exist
routes.get('/project/get/:projectId', (req, res) => {
  const projectId = Number(req.params.projectId);
  projectController.getProjectData(projectId).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// TODO: check if the records already exist
routes.put('/project/update', (req, res) => {
  projectController.updateProject(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// TODO: check if the records already exist
routes.put('/project/evaluate', (req, res) => {
  projectController.evaluateProject(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// TODO: check if the records already exist
routes.put('/project/reallocate', (req, res) => {
  projectController.reallocateProject(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// TODO: Falta tratamento dos dados
routes.delete('/project/delete/:projectId', (req, res) => {
  projectController.deleteProject(req.params.projectId).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.get('/project/keywords', (req, res) => {
  projectController.getKeywordsAvailbleToProject().then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.get('/userProposals/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = req.query;
  if (functions.checkInt(userId)) {
    projectController.getUserProposals(user).then((response) => {
      res.status(200).json(response);
    }).catch((error) => {
      res.status(400).json(error);
    });
  } else {
    res.status(401).json({ satus: 'Fail', message: 'param given is not integer' });
  }
});

routes.post('/upload', async (req, res) => {
  projectController.addFile(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.get('/areas-conhecimento', (req, res) => {
  projectController.getKnowledgeAreas().then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.get('/project/consulta', () => {
  db.query('SELECT * FROM PROJECT').then((res) => {
    res.json(res.rows);
  });
});

module.exports = routes;
