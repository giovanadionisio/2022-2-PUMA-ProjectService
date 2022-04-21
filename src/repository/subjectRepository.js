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
      'SELECT s.subjectid, s.name FROM subject s WHERE s.deleted = false',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
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
