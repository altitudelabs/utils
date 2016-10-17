'use strict';

const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addAction = require('./addAction');

const UserSchema = new Schema({ name: String });
UserSchema.plugin(addAction, { action: 'delete', done: 'deleted' });
UserSchema.plugin(addAction, { action: 'approve', done: 'approved' });

const User = mongoose.model('User', UserSchema);

describe('addAction', () => {
  afterEach((done) => {
    User.remove({}, done);
  });

  it('adds default props to schema', (done) => {
    User.create({
      name: 'tester',
    }, (err, savedUser) => {
      savedUser.delete((err, deletedUser) => {
        expect(deletedUser.isDeleted).to.be.true;
        expect(deletedUser.isDeletedAt).to.be.instanceof(Date);
        done(err);
      });
    });
  });
});
