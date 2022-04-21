const keywordRepository = require("../repository/keywordRepository");

module.exports = {
    getAllKeywords: () => {
        return new Promise((resolve, reject) => {
            keywordRepository.getAllKeywords().then((response) => {
                resolve(response);
            }).catch((error) => { reject(error) });
        })
    },
};