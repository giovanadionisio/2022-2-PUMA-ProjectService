/* eslint-disable no-restricted-syntax */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-use-before-define */
const subjectRepository = require('../repository/subjectRepository');
const keywordRepository = require('../repository/keywordRepository');
const subareaRepository = require('../repository/subareaRepository');

module.exports = {
  addSubject: (input) => new Promise(async (resolve, reject) => {
    try {
      const { subject, keywords, subareas } = input;

      const subjectResponse = await subjectRepository.addSubject(subject);

      await subjectUtils.addSubjectKeywordRelation(subjectResponse, keywords);

      await subjectUtils.addSubjectSubareaRelation(subjectResponse, subareas);

      resolve({
        subject: subjectResponse,
        keywords,
        subareas,
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
};

const subjectUtils = {
  addUniqueKeywords: async (keywords) => {
    let keywordsFiltered = await Promise.all(keywords.map(async (keyword) => {
      const keywordExists = await keywordRepository.getKeywordByName(keyword);
      console.log(keywordExists);
      if (!keywordExists) {
        return [keyword];
      }
      return [];
    }));

    keywordsFiltered = keywordsFiltered.filter((key) => key.length > 0);

    return keywordsFiltered.length > 0
      ? (keywordRepository.addManyKeywords(keywordsFiltered)) : [];
  },

  addSubjectKeywordRelation: async (subject, keywords) => {
    for await (const keyword of keywords) {
      keywordRepository.addKeywordSubjectRelation({
        keywordid: keyword.keywordid,
        subjectid: subject.subjectid,
      });
    }
  },

  addSubjectSubareaRelation: async (subject, subareas) => {
    for await (const subarea of subareas) {
      await subareaRepository.addSubjectSubareaRelation({
        subareaid: subarea.subareaid,
        subjectid: subject.subjectid,
      });
    }
  },
};
