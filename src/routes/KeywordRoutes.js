const express = require('express');

const routes = express.Router();
const keywordController = require('../controller/KeywordController');

routes.get('/keywords', (req, res) => {
  keywordController.getAllKeywords().then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// Palavras-Chave - CRUD
routes.get('/palavra-chave', (req, res) => {
  keywordController.getKeywords().then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// Palavras-Chave - CRUD
routes.get('/palavra-chave2', (req, res) => {
  keywordController.getKeywordsAlternative().then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// Body com campo Keyword necessário
routes.post('/palavra-chave', (req, res) => { // Falta tratamento dos dados
  keywordController.addKeyword(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

// Body necessita da keywordid (id palavra chave a ser mudada) e newKeyword (nova palavra a ser atualizada)
routes.put('/palavra-chave/edit', (req, res) => {
  const { body } = req;
  keywordController.updateKeywordContent(parseInt(body.keywordid), body.newKeyword).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(400).json({ 'response': body, 'error': e });
  });
});

// Body necessita do id do subject
routes.put('/switch/subject', (req, res) => {
  const { body, params } = req;
  keywordController.updateSubjectKeyword(parseInt(body.keywordid), parseInt(body.subjectid)).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(400).json({ 'response': body, 'error': e });
  });
});

// Parâmetro vai na url devido a deleção ser via update
routes.put('/palavra-chave/:keywordid/delete', (req, res) => {
  const { body, params } = req;
  keywordController.deleteKeyword(parseInt(params.keywordid)).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(400).json({ 'bruno': params, 'response': parseInt(params.keywordid) });
  });
});

// Parâmetro vai na url devido a deleção ser via update
routes.put('/palavra-chave/:keywordid/delete', (req, res) => {
  const { body } = req;
  keywordController.deleteKeyword(parseInt(params.keywordid)).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(400).json({ 'bruno': params, 'response': parseInt(params.keywordid) });
  });
});

routes.get('/subjects', (req, res) => {
  keywordController.getSubjects().then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.post('/subject/keyword', (req, res) => { // Falta tratamento dos dados
  keywordController.addKeywordSubjectRelation(req).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.get('/keywords', (req, res) => {
  keywordController.getKeywordsAvailbleToProject().then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

module.exports = routes;
