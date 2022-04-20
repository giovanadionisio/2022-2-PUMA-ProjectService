/* eslint-disable no-multi-str */
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

  getProfessorsofSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    db.query(
      'select pf.regnumber, pf.userid, us.fullname, us.email from subject sb \
      inner join lectures lt on sb.subjectid = lt.subjectid \
      inner join professor pf on lt.regnumber = pf.regnumber \
      left join common_user us on pf.userid = us.userid \
      where sb.subjectid = $1',
      [subjectid],
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),

  removeProfessorsofSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    db.query(
      'delete from lectures lt \
      where lt.subjectid in \
      ( \
        select sb.subjectid \
        from subject sb \
        inner join lectures lt \
        on sb.subjectid = lt.subjectid \
        where sb.subjectid = $1 \
      )',
      [subjectid],
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),
};
