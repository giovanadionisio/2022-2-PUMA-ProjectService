const assert = require('assert');
const controller = require('../../src/controller/ProjectController');

const constants = require('../utils/constants');

const mockProject = constants.projectMock;
const { fileMock } = constants;

describe('src/controller/ProjectController -> Project', () =>{
  it('should add a project', (done) => {
      controller.addProject(mockProject).then((response) => {
        assert.equal(typeof (response), 'number');
        done();
      }).catch((err) => {
        done(new Error(err));
      });
  });

  it('should not add a project', (done) => {
      controller.addProject({}).then((response) => {
        done(new Error(response));
      }).catch((error) => {
        assert.equal(error.severity, 'ERROR');
        done();
      });
  });

  it('should delete a project', (done) => {
      controller.deleteProject(2).then((response) => {
        assert.equal(typeof (response), 'object');
        done();
      }).catch((err) => {
        done(new Error(err));
      });
  });
});

describe('src/controller/ProjectController -> User proposal', () =>{
  it('should get a user proposal', (done) => {
      controller.getUserProposals(1).then(() => {
        done();
      }).catch((err) => {
        done(new Error(err));
      });
  });
});

describe('src/controller/ProjectController -> File', () =>{
  it('should add a file', (done) => {
      controller.addFile(fileMock).then((response) => {
        assert.equal(typeof (response), 'number')
        done();
      }).catch((err) => {
        done(new Error(err));
      });
  });
  it('should not add a file', (done) => {
      controller.addFile({}).then((response) => {
        done(new Error(response));
      }).catch((error) => {
        assert.equal(error.severity, 'ERROR');
        done();
      });
  });  
});

describe('src/controller/ProjectController -> Knowledge Areas', () =>{
  it('should get knowledge areas', (done) => {
      controller.getKnowledgeAreas().then((response) => {
        assert.equal(typeof (response), 'object')
        done();
      }).catch((err) => {
        done(new Error(err));
      });
  });  
});