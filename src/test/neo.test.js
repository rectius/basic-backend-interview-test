import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../bin/start';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Neo API', () => {
    beforeEach(function(done) {
        this.timeout(3000); // A very long environment setup.
        setTimeout(done, 500);
    });

    describe('# GET /neo/hazardous', () => {
        it('should return all DB entries which contain potentially hazardos asteroids.', (done) => {
            request(app)
            .get('/neo/hazardous')
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
    });

    describe('# GET /neo/fastest', () => {
        it('should return the model of the fastest asteroid.', (done) => {
            request(app)
            .get('/neo/fastest')
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.have.property('reference');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('date');
                expect(res.body).to.have.property('speed');
                expect(res.body).to.have.property('isHazardous');
                expect(res.body.isHazardous).to.be.false;
                done();
            })
            .catch(done);
        });
    });

    describe('# GET /neo/best-year', () => {
        it('should return a year with most asteroids.', (done) => {
            request(app)
            .get('/neo/best-year')
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('count');
                done();
            })
            .catch(done);
        });
    });

    describe('# GET /neo/best-month', () => {
        it('should return a month with most asteroids (not a month in a year).', (done) => {
            request(app)
            .get('/neo/best-month')
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('count');
                done();
            })
            .catch(done);
        });
    });

});
