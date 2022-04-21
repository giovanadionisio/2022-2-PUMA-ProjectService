/* eslint-disable no-multi-str */
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
    }).catch((e) => reject(e));
  }),

  addManyKeywords: (keywords) => new Promise((resolve, reject) => {
    db.query(
      format('INSERT INTO KEYWORD(keyword) VALUES %L RETURNING *', keywords),
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => {
      reject(e);
    });
  }),

  getAllKeywords: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM KEYWORD',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),

  getKeywordByName: (keyword) => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM KEYWORD WHERE keyword = $1',
      [keyword],
    ).then((response) => {
      resolve(response.rows[0]);
    }).catch((e) => reject(e));
  }),

  getKeywordById: (keywordId) => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM KEYWORD WHERE keywordId = $1',
      [keywordId],
    ).then((response) => {
      resolve(response.rows[0]);
    }).catch((e) => reject(e));
  }),

  getProjectKeywords: (projectId) => new Promise((resolve, reject) => {
    db.query(
      'SELECT K.keyword, K.keywordid, A.main FROM abstracts as A JOIN KEYWORD as K on A.keywordid = K.keywordid WHERE projectid = $1',
      [projectId],
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),

  addKeywordSubjectRelation: (input) => new Promise((resolve, reject) => {
    const { keywordid, subjectid } = input;
    db.query(
      'INSERT INTO summarize(keywordId, subjectId) VALUES ($1,$2) RETURNING *',
      [keywordid, subjectid],
    ).then((response) => resolve(response.rows[0]))
      .catch((e) => reject(e));
  }),

  getKeywordsAvailbleToProject: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT DISTINCT k.keywordid, k.keyword FROM summarize JOIN subject s ON summarize.subjectid = s.subjectid JOIN keyword k ON summarize.keywordid = k.keywordid',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => {
      reject(e);
    });
  }),

  getKeywordAvailbleToSubject: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT k.keywordid, k.keyword FROM keyword k LEFT JOIN summarize s ON k.keywordid = s.keywordid WHERE s.keywordid IS NULL',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),

  getKeywordsOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    db.query(
      'select kw.keyword, kw.keywordid from subject sb \
      inner join summarize sm on sb.subjectid = sm.subjectid \
      inner join keyword kw on sm.keywordid = kw.keywordid \
      where sb.subjectid = $1',
      [subjectid],
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),

  removeKeywordsOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    db.query(
      'delete from summarize sm \
      where sm.subjectid in \
      ( \
        select sb.subjectid \
        from subject sb \
        inner join summarize sm \
        on sb.subjectid = sm.subjectid \
        where sb.subjectid = $1 \
      )',
      [subjectid],

    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),
};
