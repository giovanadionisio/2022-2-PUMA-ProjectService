/* eslint-disable */
const axios = require('axios');
const assert = require('assert');
const request = require('supertest');
const app = require('../utils/testapp');
const CONSTANTS = require('../utils/constants');
const environment = require('../../src/config/environment.config');

environment.configEnv();

describe('Get Subjects', () => {
    it('Should get the subjects', (done) => {
        request(app)
            .get('/subject/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Available Keywords To Subject', () => {
    it('Should get the subjects', (done) => {
        request(app)
            .get('/subject/keywords')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Subareas of Subject', () => {
    it('Should get the subareas of subjects', (done) => {
        request(app)
            .get('/subareas')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Knowledge Areas of Subject', () => {
    it('Should get the Knowledge Areas of subjects', (done) => {
        request(app)
            .get('/knowledgeareas')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Professors of Subject', () => {
    it('Should get the Knowledge Areas of subjects', (done) => {
        request(app)
            .get('/professors')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Details of Subject', () => {
    it('Should get the Knowledge Areas of subjects', (done) => {
        request(app)
            .get('/subject/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Register Subjects', () => {
    it('Should register a subject', (done) => {
        request(app)
            .post('/subject/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.SUBJECT.REGISTER.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Register Subjects Failure', () => {
    it('Should not be able to register a subject', (done) => {
        request(app)
            .post('/subject/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.SUBJECT.REGISTER.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Details Subjects', () => {
    it('Should update a subject', (done) => {
        request(app)
            .put('/subject/1')
            .set('Accept', 'application/json')
            .send(CONSTANTS.SUBJECT.UPDATE.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Failure Update Details Subjects', () => {
    it('Should not update a subject', (done) => {
        request(app)
            .put('/subject/1')
            .set('Accept', 'application/json')
            .send(CONSTANTS.SUBJECT.UPDATE.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Delete a Subject', () => {
    it('Should delete a subject', (done) => {
        request(app)
            .delete('/subject/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});
