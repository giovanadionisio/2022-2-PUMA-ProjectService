/* eslint-disable */
const axios = require('axios');
const assert = require('assert');
const request = require('supertest');
const app = require('../utils/testapp');
const CONSTANTS = require('../utils/constants');
const environment = require('../../src/config/environment.config');

environment.configEnv();

describe('Register Keywords', () => {
    it('Should register keyword', (done) => {
        request(app)
            .post('/keyword/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.REGISTER.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Register Keywords Failure', () => {
    it('Should not be able to register keyword', (done) => {
        request(app)
            .post('/keyword/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.REGISTER.FAILURE.T2)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Keywords', () => {
    it('Should get list of keywords', (done) => {
        request(app)
            .get('/keyword/')
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

describe('Update a Keyword', () => {
    it('Should update a keyword', (done) => {
        request(app)
            .put('/keyword/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.UPDATE.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Keyword Failure', () => {
    it('Shouldnt be able update a keyword', (done) => {
        request(app)
            .put('/keyword/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.UPDATE.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Link Keyword To Subject', () => {
    it('Should link the keyword to subject with success', (done) => {
        request(app)
            .post('/keyword/subject/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.SUBJECT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Failure in Link Keyword To Subject', () => {
    it('Should not link the keyword to subject with success', (done) => {
        request(app)
            .post('/keyword/subject/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.SUBJECT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Subject of Keyword', () => {
    it('Should subject of a keyword', (done) => {
        request(app)
            .put('/keyword/subject/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.UPDATE_SUBJECT.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Failure in Update Subject of Keyword', () => {
    it('Should not allow switch subject of a keyword', (done) => {
        request(app)
            .put('/keyword/subject/')
            .set('Accept', 'application/json')
            .send(CONSTANTS.KEYWORD.UPDATE_SUBJECT.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Delete a Keyword', () => {
    it('Should delete a keyword', (done) => {
        request(app)
            .delete('/keyword/1')
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
