const db = require('../../dbconfig/dbConfig');
const { response } = require('express');

module.exports = {
  getUserProposals: async (user) => {
    return new Promise((resolve, reject) => {
      let result = new Promise(() => {});
      if (user.operation === 'projetos') {
        result = db.query('SELECT p.projectid, p.name, p.expectedresult, p.status, p.createdat, s.name AS subject, cu.fullname FROM PROJECT p LEFT JOIN subject s on p.subjectid = s.subjectid LEFT JOIN common_user cu on p.userid = cu.userid ORDER BY p.projectid DESC');
      } else if (user.operation === 'projetos-disciplina') {
        result = db.query('SELECT p.projectid, p.name, p.expectedresult, p.status, p.createdat, s.name AS subject, cu.fullname FROM project p LEFT JOIN subject s ON p.subjectid = s.subjectid LEFT JOIN common_user cu ON p.userid = cu.userid WHERE p.subjectid IN (SELECT DISTINCT s.subjectid FROM professor prof INNER JOIN lectures l ON prof.regnumber = l.regnumber INNER JOIN semester s ON s.semesterid = l.semesterid WHERE prof.userid = $1) ORDER BY p.projectid DESC', [user.userId]);
      } else {
        result = db.query('SELECT p.projectid, p.name, p.expectedresult, p.status, p.createdat, s.name AS subject, cu.fullname FROM PROJECT p LEFT JOIN subject s on p.subjectid = s.subjectid LEFT JOIN common_user cu on p.userid = cu.userid WHERE p.userid = $1 ORDER BY p.projectid DESC', [user.userId]);
      }
      result.then((response) => {
        resolve(response.rows);
      }).catch((response) => {
          reject(response);
      });
    });
  },

  addProject: (project) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO PROJECT(name,problem,expectedresult,status,userid,subjectid,createdat) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [project.name, project.problem, project.expectedresult, project.status, project.userid, project.subjectid, project.createdat],
      ).then((response) => {
          resolve(response.rows[0].projectid);
      }).catch((response) => {
        reject(response);
      });
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

  getKeywords: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT k.keywordid, k.keyword, s.subjectid FROM summarize JOIN subject s ON summarize.subjectid = s.subjectid JOIN keyword k ON summarize.keywordid = k.keywordid',
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
  },

  addProjectKeywordsRelation: (projectid, keywords) => {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < keywords.length; i++) {
        db.query(
          `INSERT INTO ABSTRACTS(keywordid,projectid,main) VALUES ($1,$2, $3) RETURNING *`,
          [keywords[i].keywordid, projectid, false], // there are no "main" keywords
        ).then(() => {
          if (i === keywords.length - 1) {
            resolve(projectid);
          }
        }).catch((response) => {
          reject(response);
        });
      }
    });
  },
}
