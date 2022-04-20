const projectRepository = require('../repository/projectRepository');
const keywordRepository = require('../repository/keywordRepository');
const { simplifiedAllocation } = require('../utils/functions');

module.exports = {
  addProject: (project) => {
    return new Promise((resolve, reject) => {
      project.subjectid = simplifiedAllocation(project.keywords).subjectid;
      projectRepository.addProject(project).then((projectid) => {
        projectRepository.addProjectKeywordsRelation(projectid, project.keywords).then((response) => {
          resolve(response);
        }).catch((e) => reject(e));
      }).catch((e) => reject(e));
    })
  },

  getUserProposals: (user) => {
    return new Promise((resolve, reject) => {
      projectRepository.getUserProposals(user).then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    })
  },

  addFile: (file) => {
    return new Promise((resolve, reject) => {
      try {
        const projectId = projectRepository.addFile(file);
        resolve(projectId);
      } catch (e) { reject(e); }
      resolve();
    })
  },

  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      try {
        const response = projectRepository.deleteProject(projectId);
        resolve(response);
      } catch (e) { reject(e); }
      resolve();
    });
  },
  getKnowledgeAreas: () => {
    return new Promise((resolve, reject) => {
      try {
        const response = projectRepository.getKnowledgeAreas();
        resolve(response);
      } catch (e) { reject(e); }
      resolve();
    });
  },
  getKeywords: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(projectRepository.getKeywords());
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },


  addKeyword: (keyword) => {

    return new Promise((resolve, reject) => {
      try{
          console.log('DEBUG',keyword.keyword);
          resolve(keywordRepository.addKeyword(keyword.keyword)); 
      } catch (e) { 
        console.log(e);
        reject(e); }
      resolve();
     });
    },
    
    getKeywordsAlternative: () => {
      return new Promise((resolve, reject) => {
        try {
          resolve(keywordRepository.getKeywordsAlternative());
        } catch (e) {
          reject(e);
        }
        resolve();
      });
    },


  updateKeyword: (keywordid, newKeyword) => {
    return new Promise((resolve, reject) => {
      try {
        console.log('vamo vê');

        resolve(keywordRepository.updateKeyword(keywordid, newKeyword));
      } catch (e) {
        console.log(e);
        reject(e);
      }
      resolve();
    });
  },


  deleteKeyword: (keywordid) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.deleteKeyword(keywordid));
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },
};
