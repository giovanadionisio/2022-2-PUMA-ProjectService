// eslint-disable-next-line import/no-unresolved
const express = require('express');

const routes = express.Router();
const db = require('../../dbconfig/dbConfig');
const functions = require('../utils/functions')

routes.get('/alocated/:subjectId', (req, res) => {
  const subjectId = parseInt(req.params.subjectId)

  if(functions.checkInt(subjectId)){
    db.query("SELECT p.projectId, p.name FROM PROJECT p\
              WHERE p.subjectId = $1 AND p.status = 'Aguardando aprovacao';",
              [subjectId]).then(response => {
                res.json(response.rows)
              })
  }
  else{
    res.status = 401
    res.json({'satus': 'Fail', 'message': 'param given is not integer'})
  }
});

routes.get('/project/:projectId', (req, res) => {
  const projectId = parseInt(req.params.projectId)

  if(functions.checkInt(projectId)){
    db.query("SELECT p.name, p.problem, p.expectedResult, u.fullName\
              FROM PROJECT p\
                INNER JOIN COMMON_USER u ON u.userId = p.userId\
                WHERE p.projectId = $1;",
              [projectId]).then(response => {
                console.log(response)
                res.json(response.rows)
              })
  }
  else{
    res.status = 401
    res.json({'satus': 'Fail', 'message': 'param given is not integer'})
  }
})

module.exports = routes;
