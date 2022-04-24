const projectRepository = require('../repository/projectRepository');
const semesterRepository = require('../repository/semesterRepository');
const subjectRepository = require('../repository/subjectRepository');
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

  getProjectData: (projectId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let User = null;
        let Subject = null;
        let Semester = null;
        let Keywords = null;
        const project = await projectRepository.getProjectData(projectId);

        User = await projectRepository.getUserData(project.userid);
        Keywords = await keywordRepository.getProjectKeywords(projectId);
        if (project.subjectid) {
          Subject = await subjectRepository.getSubject({ subjectid: project.subjectid });
        }
        if (project.semesterid) {
          Semester = await semesterRepository.getSemester(project.semesterid);
        }

        resolve({ ...project, User, Subject, Semester, Keywords });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateProject: (project) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mainKeyword = project.keywords.find((k) => k.main)?.keywordid;
        const subjectid = await projectRepository.getSubjectByKeyword(mainKeyword);

        await projectRepository.removeProjectKeywords(project.projectid);
        await projectRepository.addProjectKeywords(project.projectid, project.keywords);

        await projectRepository.updateProject({ ...project, subjectid });
        resolve({ status: 'OK' });
      } catch (error) {
        reject(error);
      }
    })
  },

  evaluateProject: (payload) => {
    return new Promise((resolve, reject) => {
      projectRepository.evaluateProject(payload).then((response) => {
        resolve(response)
      }).catch((e) => reject(e));
    });
  },

  reallocateProject: (payload) => {
    return new Promise((resolve, reject) => {
      projectRepository.reallocateProject(payload).then((response) => {
        resolve(response)
      }).catch((e) => reject(e));
    });
  },

  getUserProposals: (user) => {
    return new Promise((resolve, reject) => {
      projectRepository.getUserProposals(user).then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    })
  },

  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      projectRepository.deleteProject(projectId).then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    });
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

  getKeywordsAvailbleToProject: () => {
    return new Promise((resolve, reject) => {
      keywordRepository.getKeywordsAvailbleToProject().then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    })
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
};
