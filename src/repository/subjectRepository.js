const db = require('../../dbconfig/dbConfig');

module.exports = {
  addSubject: (input) => new Promise((resolve, reject) => {
    const { name, courseSyllabus } = input;
    db.query(
      'INSERT INTO SUBJECT(name, courseSyllabus) VALUES ($1,$2) RETURNING *',
      [name, courseSyllabus],
    ).then((response) => {
      resolve(response.rows[0]);
    }).catch((e) => reject(e));
  }),

  getSubjects: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT s.subjectid, s.name FROM subject s WHERE not(s.deleted) ORDER BY s.subjectid DESC',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),

  getSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    db.query(
      'select * from subject sb where sb.subjectid = $1',
      [subjectid],
    )
      .then((response) => {
        resolve(response.rows[0]);
      }).catch((response) => {
        reject(response);
      });
  }),

  updateSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid, name, coursesyllabus } = input;
    db.query(
      'UPDATE subject \
        SET name = $1, \
          coursesyllabus = $2 \
        WHERE subjectid = $3  RETURNING *',
      [name, coursesyllabus, subjectid],
    )
      .then((response) => {
        resolve(response.rows[0]);
      }).catch((response) => {
        reject(response);
      });
  }),

  deleteSubject: (subjectId) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE subject SET deleted = true WHERE subjectid = $1 RETURNING *',
      [subjectId])
      .then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);
      });
  }),
};
