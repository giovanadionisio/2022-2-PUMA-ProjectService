const authentication = require('../utils/teste');

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

// TODO: Falta tratamento dos dados
routes.delete('/project/delete/:projectId', (req, res) => {
  projectController.deleteProject(req.params.projectId).then((response) => {
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

routes.put('/alocate/:proposalId/status', (req, res) => {
  const { proposal } = req.body;
  if ('approved' in proposal) {
    const stats = proposal.approved ? 'Aprovado' : 'Recusado';
    db.query('UPDATE PROJECT SET status=$1 WHERE projectid = $2',
      [stats, req.params.proposalId]).then((response) => {
        if (response.rowCount == 0) { res.status(404).json({ message: 'Project not found' }); } else {
          res.status(201).json({ message: 'Project updated' });
        }
      });
  } else {
    res.status(400).json({ status: 'Fail', message: "Request body doesn't match the expected" });
  }
});

routes.put('/proposal/:projectId', (req, res) => {
  const projId = parseInt(req.params.projectId);
  const subjectId = parseInt(req.body.subjectId);
  if (functions.checkInt(projId) && functions.checkInt(subjectId)) {
    db.query('UPDATE PROJECT SET subjectId = $1 WHERE projectId = $2',
      [subjectId, projId]).then((response) => {
        res.status(200).json({ message: 'Alterado com sucesso' });
      }).catch((err) => {
        res.status(400).json(err.message);
      });
  } else {
    res.status(400).json({ satus: 'Fail', message: 'param given is not integer' });
  }
});

routes.get('/project/consulta', () => {
  db.query('SELECT * FROM PROJECT').then((res) => {
    res.json(res.rows);
  });
});

routes.post('/upload', async (req, res) => {
  projectController.addFile(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.get('/subject', (req, res) => {
  db.query('SELECT s.subjectId, s.name FROM SUBJECT s;').then((response) => {
    res.json(response.rows);
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
