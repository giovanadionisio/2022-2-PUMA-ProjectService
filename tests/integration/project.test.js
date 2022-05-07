/* eslint-disable */
const axios = require('axios');
const assert = require('assert');
const request = require('supertest');
const app = require('../utils/testapp');
const CONSTANTS = require('../utils/constants');
const environment = require('../../src/config/environment.config');

environment.configEnv();

describe('Register Project Success', () => {
    it('Should register project', (done) => {
        request(app)
            .post('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.REGISTER.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Register Project Failure', () => {
    it('Should not register project', (done) => {
        request(app)
            .post('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.REGISTER.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Project Success', () => {
    it('Should update project', (done) => {
        request(app)
            .put('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.UPDATE.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Project Failure', () => {
    it('Should not update project', (done) => {
        request(app)
            .put('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.UPDATE.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Success Keywords Availble To Project', () => {
    it('Should get keywords availble to project', (done) => {
        request(app)
            .get('/project/keywords')
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
