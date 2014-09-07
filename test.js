'use strict';

var assert = require('assert');
var path = require('path');
var gutil = require('gulp-util');

var fc2json = require('./index.js');

describe('gulp-file-contents-to-json', function() {

  describe('fc2json()', function() {

    it('should blob one or several files', function(done) {
      assert.equal(-1, [1,2,3].indexOf(5));
    });

  });

});
