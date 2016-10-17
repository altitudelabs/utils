'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const addAction = (schema, opts = { action: 'action', done: 'actioned'  }) => {
  const action = `is${_.capitalize([opts.done])}`;
  const actionTime = `${action}At`;
  const actionBy = `${action}By`;

  schema.add({
    [action]: {
      type: Boolean,
      default: false,
      index: true,
    },
    [actionTime]: {
      type: Date,
    },
    [actionBy]: {
      type: Schema.Types.ObjectId,
    },
  });

  schema.methods[opts.action] = function(performerId, cb) {
    let callback = typeof performerId === 'function' ? performerId : cb;
    let performer = cb !== undefined ? performerId : null;

    this[action] = true;

    if (schema.path(actionTime)) {
      this[actionTime] = new Date();
    }

    if (schema.path(actionBy)) {
      this[actionBy] = performer;
    }

    return this.save(callback);
  };

  schema.methods[_.camelCase(`un ${opts.action}`)] = function(cb) {
    this[action] = false;

    if (schema.path(actionTime)) {
      this.deletedAt = undefined;
    }

    if (schema.path(actionBy)) {
      this.deletedBy = undefined;
    }

    return this.save(cb);
  };
};

module.exports = addAction;
