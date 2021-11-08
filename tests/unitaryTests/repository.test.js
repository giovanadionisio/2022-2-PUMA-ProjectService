const { doesNotMatch } = require('assert');
const assert = require('assert');
const repository = require('../../src/repository/projectRepository');

const constants = require('../utils/constants');

const { projectMock } = constants;
const { fileMock } = constants;
const knowledgeAreasMock = constants.knowledgeAreasMock;

describe('src/repository/projectRepository -> Add Project', () => {
  it('should add a project', (done) => {
    repository.addProject(projectMock).then((response) => {
      assert.equal(typeof (response), 'number');
      done();
    });
  it('should not add a project', (done) => {
    repository.addProject({}).then((response) => {
      done(new Error(response));
    }).catch((error) => {
      assert.equal(error.severity, 'ERROR');
      done();
    });
  });
});
});

describe('src/repository/projectRepository -> User proposal', () => {
  it('should get a user proposal', (done) => {
    repository.getUserProposals(1).then((response) => {
      assert.equal(typeof (response), 'object');
      done();
    });
  });
});

describe('src/repository/projectRepository -> Add a file', () => {
it('should add a file', (done) => {
  repository.addFile(fileMock).then((response) => {
    assert.equal(typeof (response), 'number');
    done();
  });
});
it('should not add a file', (done) => {
  repository.addFile({}).then((response) => {
    done(new Error(response));
  }).catch((error) => {
    assert.equal(error.severity, 'ERROR');
    done();
  });
});
});

describe('src/repository/projectRepository -> Retrieve projects', () => {
it('should retrieve all the projects', (done) => {
  repository.retriveProjects().then((response) => {
    assert.equal(typeof (response), 'object');
    done();
  });
});
it('should retrieve a project', (done) => {
  repository.retriveProject(1).then((response) => {
    assert.equal(typeof (response), 'object');
    done();
  });
});
});


describe('src/repository/projectRepository -> Delete projects', () => {
it('should delete a project', (done) => {
  repository.deleteProject(2).then((response) => {
    assert.equal(typeof (response), 'object');
    done();
  });
});

});

describe('src/repository/projectRepository -> Knowledge areas', () => {
it('should retrieve all knowledge areas', (done) => {
  repository.getKnowledgeAreas().then((response) => {
    assert.equal(typeof (response), 'object');
    done();
  });
});

it('should add knowledge area to project', (done) => {
  repository.addProjectKnowledgeAreasRelation(1, knowledgeAreasMock).then((response) => {
    assert.equal(typeof (response), 'object');
    done();
  }).catch(() => {
    done();
  });
});

it('should not add knowledge area to project', (done) => {
  repository.addProjectKnowledgeAreasRelation(1, []).then((response) => {
    console.log(response);
    done(new Error(response));
  }).catch((error) => {
    assert.equal(error.severity, 'ERROR');
    done();
  });
});

});
