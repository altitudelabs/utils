/* global describe, before, after, beforeEach, afterEach, it, expect */
'use strict';

const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/test');

const libPath = `${__dirname}/lib`;
fs.readdirSync(path.normalize(`${libPath}`)).forEach((util) => {
  if (util.indexOf('.') === -1) { // extension does not exist -> it's a folder
    fs.readdirSync(path.normalize(`${libPath}/${util}`)).forEach((file) => {
      if (file.indexOf('.spec.js') !== -1) { // find spec.js files
        require(`${libPath}/${util}/${file}`);  // eslint-disable-line global-require
      }
    });
  }
});
