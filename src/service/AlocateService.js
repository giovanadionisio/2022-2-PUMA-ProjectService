/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// import axios from '@/main.js';
const axios = require('axios')

module.exports = {
  getSubject(keywords) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_API}/alocate`, keywords).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(`Erro ao recuperar a disciplina ${error}`);
      });
    });
  },
}

