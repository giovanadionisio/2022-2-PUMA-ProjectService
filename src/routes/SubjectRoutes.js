const express = require('express');

const routes = express.Router();
const subjectController = require('../controller/SubjectController');

routes.post('/subject', (req, res) => {
  subjectController.addSubject(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.get('/subject', (req, res) => {
  subjectController.getSubjects().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.delete('/subject/:subjectId', (req, res) => {
  subjectController.deleteSubject(req.params.subjectId).then((response) => {
    res.status(200).json(response.data);
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

routes.get('/subject/keywords', (req, res) => {
  subjectController.getKeywords().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.get('/subareas', (req, res) => {
  subjectController.getSubareas().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

module.exports = routes;
