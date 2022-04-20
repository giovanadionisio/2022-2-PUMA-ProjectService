const db = require('../../dbconfig/dbConfig');

module.exports = {
  addProfessorSubjectRelation: (input) => new Promise((resolve, reject) => {
    const { regNumber, subjectid } = input;
    db.query(
      'INSERT INTO lectures(regNumber, subjectid) VALUES ($1,$2) RETURNING *',
      [regNumber, subjectid],
    ).then((response) => {
      resolve(response.rows);
    })
      .catch((e) => reject(e));
  }),

  getProfessors: () => new Promise((resolve, reject) => {
    db.query(
      'Select pf.regnumber, pf.userid, us.fullname, us.email from professor pf left join common_user us on pf.userid = us.userid;',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),
};
