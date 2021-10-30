const projectRepository = require('../repository/projectRepository');

function addProject(project) {
  return new Promise((resolve, reject) => {
    projectRepository.addProject(project).then((response) => {
      projectRepository.addProjectKnowledgeAreasRelation(
        response,
        project.knowledgeareas,
      ).then(() => {
        resolve(response);
      });
    }).catch((e) => reject(e));
  });
}

function addFile(file) {
  return new Promise((resolve, reject) => {
    try {
      const projectId = projectRepository.addFile(file);
      resolve(projectId);
    } catch (e) {
      reject(e);
    }
    resolve();
  });
}

function deleteProject(projectId) {
  return new Promise((resolve, reject) => {
    try {
      const response = projectRepository.deleteProject(projectId);
      resolve(response);
    } catch (e) {
      reject(e);
    }
    resolve();
  });
}

function getKnowledgeAreas() {
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

module.exports = {
  addProject,
  addFile,
  deleteProject,
  getKnowledgeAreas,
};