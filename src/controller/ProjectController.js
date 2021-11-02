const projectRepository = require('../repository/projectRepository');

module.exports = {
  addProject: (project) => {
    return new Promise((resolve, reject) => {
      projectRepository.addProject(project).then((response) => {
        projectRepository.addProjectKnowledgeAreasRelation(
          response,
          project.knowledgeareas,
        ).then(() => {
          resolve(response);
        });
      }).catch((e) => reject(e));
    })
  },
  
  getUserProposals: async (userId) => {
    return projectRepository.getUserProposals(userId);
  },

  addFile: (file) => {
    return new Promise((resolve, reject) => {
      try {
        const projectId = projectRepository.addFile(file);
        resolve(projectId);
      } catch (e) {
        reject(e);
      }
      resolve();
    })
  },
  
  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      try {
        const response = projectRepository.deleteProject(projectId);
        resolve(response);
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },
  
  getKnowledgeAreas: () => {
    return new Promise((resolve, reject) => {
      try {
        const response = projectRepository.getKnowledgeAreas();
        resolve(response);
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  }
};
