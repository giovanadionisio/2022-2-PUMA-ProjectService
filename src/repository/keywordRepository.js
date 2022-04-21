/* eslint-disable import/order */
const db = require('../../dbconfig/dbConfig');
const format = require('pg-format');

module.exports = {
  addKeyword: (keyword) => new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO KEYWORD(keyword) VALUES ($1) RETURNING *',
      [keyword],
    ).then((response) => {
      resolve(response.rows[0]);
    }).catch((e) => {
      console.log('banco', e);
      reject(e);

    });
  }),

  addManyKeywords: (keywords) => new Promise((resolve, reject) => {
    db.query(
      format('INSERT INTO KEYWORD(keyword) VALUES %L RETURNING *', keywords),
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => {
      console.log(e);
      reject(e);
    });
  }),

  getKeywordByName: (keyword) => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM KEYWORD WHERE keyword = $1',
      [keyword],
    ).then((response) => {
      resolve(response.rows[0]);
    }).catch((e) => reject(e));
  }),

  addKeywordSubjectRelation: (input) => new Promise((resolve, reject) => {

    keywordid = input.body.keywordid;
    subjectid = input.body.subjectid;
    db.query(
      'INSERT INTO summarize(keywordid, subjectid) VALUES ($1,$2) RETURNING *',
      [keywordid, subjectid],
    ).then((response) => resolve(response.rows[0]))
      .catch((e) => reject(e));
  }),

  getKeywordAvailbleToSubject: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT k.keywordid, k.keyword FROM keyword k LEFT JOIN summarize s ON k.keywordid = s.keywordid WHERE s.keywordid IS NULL',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),


  getKeywordsAlternative: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT k.keywordid, k.keyword, s.name as subjectname, s.subjectid FROM summarize JOIN subject s ON summarize.subjectid = s.subjectid JOIN keyword k ON summarize.keywordid = k.keywordid and k.deleted is not true ORDER BY k.keywordid;',
      ).then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);
      });
    });
  },

  getSubjects: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT subjectId as value, name as text FROM subject;',
      ).then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);
      });
    });
  },


  updateKeyword:(keywordid, newKeyword) => {
    try {

      return new Promise((resolve, reject) => {
        db.query(
          // 'UPDATE COMMON_USER SET passwordHash = $1 WHERE email = $2 RETURNING *;',
          'UPDATE KEYWORD SET keyword = $1 where keywordid = $2 RETURNING *;',
          [newKeyword, keywordid]

        ).then((response) => { 
            console.log(response);
            resolve(response.rows);
          })
          .catch((e) => {
            reject(e);
          });
      });
    } catch (e) {
      
      reject(e);

    }
  },

  
  deleteKeyword:(keywordid) => {
    try {

      return new Promise((resolve, reject) => {
        db.query(
          // 'UPDATE COMMON_USER SET passwordHash = $1 WHERE email = $2 RETURNING *;',
          'UPDATE KEYWORD SET deleted = true where keywordid = $1  RETURNING *;',
          [keywordid]

        ).then((response) => { 
            console.log(response);
            resolve(response.rows);
          })
          .catch((e) => {
            reject(e);
          });
      });
    } catch (e) {
      
      reject(e);

    }
  },

  
  updateSubjectKeyword:(keywordid, subjectid) => {
    try {

      return new Promise((resolve, reject) => {
        db.query(
          'UPDATE public.summarize SET keywordid = $1, subjectid=$2 WHERE keywordid = $1 RETURNING *;',
          [keywordid, subjectid]

        ).then((response) => { 
            console.log(response);
            resolve(response.rows);
          })
          .catch((e) => {
            reject(e);
          });
      });
    } catch (e) {
      
      reject(e);

    }
  },

};
