const db = require('../../dbconfig/dbConfig');

module.exports = {
  getUserProposals: async (user) => {
    return new Promise((resolve, reject) => {
      let result = new Promise(() => { });
      if (user.operation === 'projetos') {
        result = db.query('SELECT p.projectid, p.name, p.expectedresult, p.status, p.createdat, s.name AS subject, cu.fullname FROM PROJECT p LEFT JOIN subject s on p.subjectid = s.subjectid LEFT JOIN common_user cu on p.userid = cu.userid WHERE not(p.deleted) ORDER BY p.projectid DESC');
      } else if (user.operation === 'projetos-disciplina') {
        result = db.query('SELECT p.projectid, p.name, p.expectedresult, p.status, p.createdat, s.name AS subject, cu.fullname FROM project p LEFT JOIN subject s ON p.subjectid = s.subjectid LEFT JOIN common_user cu ON p.userid = cu.userid WHERE not(p.deleted) and p.subjectid IN (SELECT DISTINCT l.subjectid FROM professor prof INNER JOIN lectures l ON prof.regnumber = l.regnumber WHERE prof.userid = $1) ORDER BY p.projectid DESC', [user.userId]);
      } else {
        result = db.query('SELECT p.projectid, p.name, p.expectedresult, p.status, p.createdat, s.name AS subject, cu.fullname FROM PROJECT p LEFT JOIN subject s on p.subjectid = s.subjectid LEFT JOIN common_user cu on p.userid = cu.userid WHERE not(p.deleted) and p.userid = $1 ORDER BY p.projectid DESC', [user.userId]);
      }
      result.then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);

      });
    });
  },

  getProjectData: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM PROJECT WHERE projectid = $1', [projectId])
        .then((response) => {
          resolve(response.rows[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getUserData: (userId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT userId, fullName, email, phoneNumber FROM COMMON_USER WHERE userid = $1', [userId])
        .then((response) => {
          resolve(response.rows[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Used in allocation
  getSubjectByKeyword: (keywordId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM SUMMARIZE WHERE keywordid = $1`, [keywordId]).then((response) => {
        if (response.rows[0]) {
          resolve(response.rows[0].subjectid);
        } else {
          reject({ status: 'NOK', message: 'Nenhuma disciplina contém a palavra-chave' });
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },

  evaluateProject: ({ projectId, status, feedback }) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE PROJECT SET status = $2, feedback = $3 WHERE projectid = $1`,
        [projectId, status, feedback]
      ).then((response) => {
        resolve({ status: 'OK' });
      }).catch((error) => {
        reject(error);
      });
    });
  },

  reallocateProject: ({ projectId, status, feedback, subjectId }) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE PROJECT SET status = $2, feedback = $3, subjectid = $4 WHERE projectid = $1`,
        [projectId, status, feedback, subjectId]
      ).then((response) => {
        resolve({ status: 'OK' });
      }).catch((error) => {
        reject(error);
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

  updateProject: (project) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { projectid, subjectid, name, expectedresult, problem } = project;
        await db.query(`UPDATE PROJECT SET subjectid = $2, name = $3, expectedResult = $4, problem = $5 WHERE projectid = $1`,
          [projectid, subjectid, name, expectedresult, problem]);
        resolve({ status: 'OK' });
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE PROJECT SET deleted = true WHERE projectid = $1`,
        [projectId]
      ).then((response) => {
        resolve({ status: 'OK' });
      }).catch((error) => {
        reject(error);
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

  addProjectKeywords: (projectId, keywords) => {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < keywords.length; i++) {
        db.query(
          `INSERT INTO ABSTRACTS(projectid, keywordid, main) VALUES ($1, $2, $3) RETURNING *`,
          [projectId, keywords[i].keywordid, keywords[i].main],
        ).then(() => {
          if (i === keywords.length - 1) {
            resolve();
          }
        }).catch((response) => {
          reject(response);
        });
      }
    });
  },

  removeProjectKeywords: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ABSTRACTS WHERE projectid = $1`, [projectId]).then((response) => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
