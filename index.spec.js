/* global describe, before, after, beforeEach, afterEach, it, expect */
'use strict';

let fs = require('fs');
let path = require('path');
let spec;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/test');

fs.readdirSync(path.normalize(`${__dirname}/util`)).forEach((util) => {
  if (util.indexOf('.') === -1) { // extension does not exist -> it's a folder
    fs.readdirSync(path.normalize(`${__dirname}/util/${util}`)).forEach((file) => {
      if (file.indexOf('.spec.js') !== -1) { // find spec.js files
        require(`${__dirname}/util/${util}/${file}`);  // eslint-disable-line global-require
      }
    });
  }
});
