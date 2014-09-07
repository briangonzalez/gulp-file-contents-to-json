'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');

var nconf = require('nconf');
nconf.use('memory');

var PLUGIN_NAME = 'gulp-file-contents-to-json';

module.exports = function (dest) {

  var first = null;

  // Setup the stream to be returned.
  // through2.obj(fn) is a convenience wrapper around
  // through2({ objectMode: true }, fn)
  //
  return through2.obj(function (file, enc, callback) {

    // Always error if file is a stream or null.
    //
    if ( file.isNull() ) {
      return callback();
    }
    else if ( file.isStream() ) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported.'));
      return callback();
    }

    try {

      // Use Nconf to create a json object
      first = first || file;
      var id = file.path.replace(file.base, '').split('/').join(':');   // 'foo/bar/bax.txt' => 'foo:bar:baz.txt'
      var contents = file.contents.toString("utf-8");
      nconf.set(id, contents);

      // Create file which will become the JSON blob.
      //
      var out = new gutil.File({
        base: first.base,
        cwd: first.cwd,
        path: path.join(file.base, dest),
        contents: new Buffer(JSON.stringify(nconf.get(), null, 2))
      });

      this.push(out);
      callback();
    } catch (e) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Error:', e));
      callback(e);
    }

  });

};
