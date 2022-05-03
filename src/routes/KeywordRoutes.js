const express = require('express');

const routes = express.Router();
const keywordController = require('../controller/KeywordController');

routes.get('/keyword', (req, res) => {
  keywordController.getKeywordsAlternative().then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.post('/keyword', (req, res) => {
  keywordController.addKeyword(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.put('/keyword', (req, res) => {
  // Body necessita da keywordid (id palavra chave a ser mudada) e newKeyword (nova palavra a ser atualizada)
  const { body } = req;
  keywordController.updateKeywordContent(parseInt(body.keywordid), body.newKeyword).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.post('/keyword/subject', (req, res) => {
  keywordController.addKeywordSubjectRelation(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.put('/keyword/subject', (req, res) => {
  const { body } = req;
  keywordController.updateSubjectKeyword(parseInt(body.keywordid), parseInt(body.subjectid)).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.delete('/keyword/:keywordid', (req, res) => {
  const { params } = req;
  keywordController.deleteKeyword(parseInt(params.keywordid)).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json(error);
  });
});

module.exports = routes;
