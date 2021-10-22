// eslint-disable-next-line import/no-unresolved
const express = require('express');

const routes = express.Router();
const db = require('../../dbconfig/dbConfig');
const functions = require('../utils/functions')

routes.get('/alocated/:subjectId', (req, res) => {
  const subjectId = parseInt(req.params.subjectId)

  if(functions.checkInt(subjectId)){
    db.query("SELECT p.projectId, p.name, p.expectedResult FROM PROJECT p\
              WHERE p.subjectId = $1 AND p.status = 'Aguardando aprovacao';",
              [subjectId]).then(response => {
                res.status(200).json(response.rows)
              })
  }
  else{
    res.status(401).json({'satus': 'Fail', 'message': 'param given is not integer'})
  }
});

routes.put('/alocated/status', (req, res) => {
  const proposal = req.body.proposal;
  if('projectId' in proposal && 'approved' in proposal){
    const stats = proposal.approved ? 'Aprovado' : 'Recusado'
    db.query("UPDATE PROJECT SET status = $1 WHERE projectId = $2",
              [stats, proposal.projectId]).then(response => {
                if(response.rowCount == 0)
                  res.status(404).json({'message': 'Project not found'});
                else {
                  res.status(201).json({'message': 'Project updated'})
                }
              })
  }
  else{
    res.status(400).json({'status': 'Fail', 'message': "Request body doesn't match the expected"})
  }
});

routes.get('/project/:projectId', (req, res) => {
  const projectId = parseInt(req.params.projectId)

  if(functions.checkInt(projectId)){
    db.query('SELECT p.name, p.problem, p.expectedResult, u.fullName, u.phoneNumber\
              FROM PROJECT p\
                INNER JOIN COMMON_USER u ON u.userId = p.userId\
                WHERE p.projectId = $1;',
              [projectId]).then((response) => {
                db.query('SELECT ka.knowledgeArea, sa.description\
                            FROM KNOWLEDGE_AREA ka\
                            INNER JOIN SUBAREA sa\
                              ON sa.knowledgeAreaId=ka.knowledgeAreaId\
                            INNER JOIN has\
                              ON sa.subAreaId= has.subAreaId\
                            WHERE has.projectId = $1;', [projectId]).then((resAreas) =>{
                              let result = response.rows[0];
                              result['areas'] = resAreas.rows;
                              res.json(result)
                            })
              })
  }
  else{
    res.status = 401
    res.json({'satus': 'Fail', 'message': 'param given is not integer'})
  }
});

routes.get('/subject', (req, res) => {
  db.query('SELECT s.subjectId, s.name FROM SUBJECT s;').then((response) => {
    res.json(response.rows);
  })
});

module.exports = routes
