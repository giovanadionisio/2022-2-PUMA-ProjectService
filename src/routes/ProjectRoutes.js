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

routes.get('/alocated/:subjectId', (req, res) => {
  const subjectId = parseInt(req.params.subjectId);

  if (functions.checkInt(subjectId)) {
    db.query("SELECT p.projectId, p.name, p.expectedResult FROM PROJECT p\
              WHERE p.subjectId = $1 AND p.status = 'Aguardando aprovacao';",
    [subjectId]).then((response) => {
      res.status(200).json(response.rows);
    });
  } else {
    res.status(401).json({ satus: 'Fail', message: 'param given is not integer' });
  }
});

routes.get('/userProposals/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = req.query;
  if (functions.checkInt(userId)) {
    projectController.getUserProposals(user).then((response) => {
      res.status(200).json(response);
    }).catch((error) => {
      console.log(error);
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
    console.log(`entrei - ${stats}`);
    db.query('UPDATE PROJECT SET status=$1 WHERE projectid = $2',
      [stats, req.params.proposalId]).then((response) => {
      console.log(response);
      if (response.rowCount == 0) { res.status(404).json({ message: 'Project not found' }); } else {
        res.status(201).json({ message: 'Project updated' });
      }
    });
  } else {
    res.status(400).json({ status: 'Fail', message: "Request body doesn't match the expected" });
  }
});

routes.get('/project/:projectId', (req, res) => {
  const projectId = parseInt(req.params.projectId);
  if (functions.checkInt(projectId)) {
    db.query('SELECT p.* FROM PROJECT p WHERE p.projectid = $1',
    [projectId]).then((response) => {
      const result = response.rows[0];
      if (!result) {
        res.status(400).json({ message: `Projeto de id ${projectId} não encontrado` });
      } else {
        db.query('SELECT k.* FROM KEYWORD k JOIN abstracts a on k.keywordid = a.keywordid AND a.projectid = $1', [projectId]).then((response) => {
          result.keywords = response.rows;
          res.json(result);
        });
      }
    });
  } else {
    res.status = 401;
    res.json({ satus: 'Fail', message: 'param given is not integer' });
  }
});

routes.get('/subject', (req, res) => {
  db.query('SELECT s.subjectId, s.name FROM SUBJECT s;').then((response) => {
    res.json(response.rows);
  });
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

routes.post('/upload', async (req, res) => {
  projectController.addFile(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.post('/project', (req, res) => { // Falta tratamento dos dados
  projectController.addProject(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.delete('/project/:projectId', (req, res) => { // Falta tratamento dos dados
  projectController.deleteProject(req.params.projectId).then((response) => {
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

// Palavras-Chave - CRUD
routes.get('/palavra-chave', (req, res) => {
  projectController.getKeywords().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

// Palavras-Chave - CRUD
routes.get('/palavra-chave2', (req, res) => {
  console.log('Deus é mais');
  projectController.getKeywordsAlternative().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

// Body com campo Keyword necessário
routes.post('/palavra-chave', (req, res) => { // Falta tratamento dos dados

  projectController.addKeyword(req.body).then((response) => {
    res.status(200).json({ 'deu bom': response });
  }).catch((e) => {
    res.status(400).json({ 'chorando': e});
  });
});

// Body necessita da keywordid (id palavra chave a ser mudada) e newKeyword (nova palavra a ser atualizada)
routes.put('/palavra-chave/edit', (req, res) => {
  const { body, params } = req;
  projectController.updateKeyword(parseInt(body.keywordid), body.newKeyword).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(400).json({ 'response': body, 'error': e });
  });
});
  
// Parâmetro vai na url devido a deleção ser via update
routes.put('/palavra-chave/:keywordid/delete', (req, res) => {
  const { body, params } = req;
  projectController.deleteKeyword(parseInt(params.keywordid)).then((response) => {

    res.status(200).json(response);
  }).catch((e) => {
    res.status(400).json({ 'bruno': params, 'response': parseInt(params.keywordid) });
  });
});



routes.get('/project/consulta', () => {
  db.query('SELECT * FROM PROJECT').then((res) => {
    res.json(res.rows);
  });
});

module.exports = routes;
