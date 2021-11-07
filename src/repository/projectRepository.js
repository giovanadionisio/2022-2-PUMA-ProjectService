const db = require('../../dbconfig/dbConfig');

module.exports = {
  getUserProposals: async (userId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM PROJECT WHERE userid = $1', [userId]
      ).then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);
      });
    });
  },

  addProject: (project) => {
    //Para testagem enquanto não existe alocação:
    project.status = 'Aguardando aprovacao';
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO PROJECT(name,problem,expectedresult,status,userid,subjectid) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [
          project.name, project.problem, project.expectedresult,
          project.status, project.userid, project.subjectid,
        ],
      ).then((response) => resolve(response.rows[0].projectid)).catch((response) => reject(response));
    });
  },

  addFile: (file) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO FILE(filename,bytecontent,projectid) VALUES ($1,$2,$3) RETURNING *',
        [file.filename, file.bytecontent, file.projectid],
      ).then((response) => {
        resolve(response.rows[0].fileid);
      }).catch((response) => {
        reject(response);
      });
    });
  },

  retriveProjects: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM PROJECT')
        .then((response) => {
          resolve(response.rows);
        }).catch((response) => {
          reject(response);
        });
    });
  },

  retriveProject: (projectid) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT p.name, p.problem,p.expectedresult,p.status FROM PROJECT as p WHERE projectid=$1',
        [projectid],
      )
        .then((response) => {
          resolve(response.rows);
        })
        .catch((response) => {
          reject(response);
        });
    });
  },

  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM FILE WHERE projectid = $1', [projectId]).then(() => {
        db.query('DELETE FROM EXECUTES WHERE projectid = $1', [projectId]).then(() => {
          db.query('DELETE FROM HAS WHERE projectid = $1', [projectId]).then(() => {
            db.query('DELETE FROM PROJECT WHERE projectid = $1 RETURNING *', [projectId]).then((response) => {
              resolve(response);
            }).catch((error) => {
              reject(error);
            });
          }).catch((error) => {
            reject(error);
          });
        }).catch((response) => {
          reject(response);
        });
      }).catch((response) => {
        reject(response);
      });
    });
  },

  getKnowledgeAreas: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM KNOWLEDGE_AREA',
      ).then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);
      });
    });
  },

  addProjectKnowledgeAreasRelation: (projectId, knowledgeAreas) => {

    const areas = [];
    let iterations = 0;
    knowledgeAreas.forEach((area) => {
      areas.push([area.knowledgeareaid, projectId]);
    });
    return new Promise((resolve, reject) => {
      if(areas.length == 0){
        reject({error: "Missing knowledge areas", severity: "ERROR"});
      }
      areas.forEach((area) => {
        iterations++;
        db.query(
          'INSERT INTO has (subAreaId, projectid) VALUES ($1,$2) RETURNING *', [area[0], area[1]],
        ).then((response) => {
          if (--iterations == 0) {
            resolve(response.rows[0]);
          }
        }).catch((response) => {
          reject(response);
        });
      });
    });
  }
}
