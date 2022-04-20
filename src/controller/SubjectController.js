/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-use-before-define */
const subjectRepository = require('../repository/subjectRepository');
const keywordRepository = require('../repository/keywordRepository');
const subareaRepository = require('../repository/subareaRepository');
const professorRepository = require('../repository/professorRepository');

module.exports = {
  addSubject: (input) => new Promise(async (resolve, reject) => {
    try {
      const {
        subject, keywords, subareas, professors,
      } = input;

      const subjectResponse = await subjectRepository.addSubject(subject);

      const keywordsResponse = await subjectUtils
        .addSubjectKeywordRelation(subjectResponse, keywords);

      await subjectUtils.addSubjectSubareaRelation(subjectResponse, subareas);

      await subjectUtils.addSubjectProfessorRelation(subjectResponse, professors);

      resolve({
        subject: subjectResponse,
        keywords: keywordsResponse,
        subareas,
        professors,
      });
    } catch (e) {
      reject(e);
    }
  }),

  getKeywords: () => new Promise(async (resolve, reject) => {
    try {
      const response = await keywordRepository.getKeywordAvailbleToSubject();
      resolve(response);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  }),

  getSubareas: () => new Promise(async (resolve, reject) => {
    try {
      const response = await subareaRepository.getSubareas();
      resolve(response);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  }),

  getProfessors: () => new Promise(async (resolve, reject) => {
    try {
      const response = await professorRepository.getProfessors();
      resolve(response);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  }),
};

const subjectUtils = {
  addSubjectKeywordRelation: async (subject, keywords) => {
    let res = [];
    for await (let keyword of keywords) {
      if (!keyword.hasOwnProperty('keywordid')) {
        keyword = await keywordRepository.addKeyword(keyword.keyword)
          .catch((e) => console.log(e));
        delete keyword.deleted;
      }
      res = [...res, keyword];
      keywordRepository.addKeywordSubjectRelation({
        keywordid: keyword.keywordid,
        subjectid: subject.subjectid,
      });
    }
    return res;
  },

  addSubjectSubareaRelation: async (subject, subareas) => {
    for await (const subarea of subareas) {
      await subareaRepository.addSubjectSubareaRelation({
        subareaid: subarea.subareaid,
        subjectid: subject.subjectid,
      });
    }
  },

  addSubjectProfessorRelation: async (subject, professors) => {
    for await (const professor of professors) {
      await professorRepository.addProfessorSubjectRelation({
        regNumber: professor.regnumber,
        subjectid: subject.subjectid,
      });
    }
  },
};
