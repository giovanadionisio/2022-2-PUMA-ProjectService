const db = require('../../dbconfig/dbConfig');

module.exports = {
    getSemester: (semesterId) => new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM SEMESTER WHERE subjectId = $1',
            [semesterId],
        ).then((response) => {
            resolve(response.rows[0]);
        }).catch((e) => reject(e));
    }),
};
