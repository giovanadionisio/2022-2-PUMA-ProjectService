const db = require('../dbconfig/dbConfig');

async function create(project) {
  await db.query(
    `INSERT INTO PROJECT(name,problem,expectedresult,knowledgearea,status,userid) 
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      project.name, project.problem, project.expectedresult,
      project.knowledgearea, project.status, project.userid,
    ],
  );
}

async function getProject(idProjeto) {
  await db.query('SELECT p.name, p.problem,p.expectedresult,p.status,p.knowledgearea FROM PROJETO as p WHERE id=$1', [idProjeto]).then((response) => response.rows);
}

module.exports = {
  create,
  getProject,
};