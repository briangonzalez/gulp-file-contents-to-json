'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');

var nconf = require('nconf');
nconf.file({ file: 'store.json' });

var PLUGIN_NAME = 'gulp-file-contents-to-json';

module.exports = function (dest, options) {
  
  // set defaults for options here
  options = options ? options : {};
  
  
  var first = null;
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0,v=c==='x'?r:r&0x3|0x8;return v.toString(16);
  });

  //
  // Setup the stream to be returned.
  // through2.obj(fn) is a convenience wrapper around
  // through2({ objectMode: true }, fn)
  //
  return through2.obj(function (file, enc, callback) {

    //
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

      //
      // Use nconf to create a json object of our files.
      //
      first = first || file;
      var id = file.path.replace(file.base, '').split('/').join(':');   // 'foo/bar/bax.txt' => 'foo:bar:baz.txt'
      
      if (options.extname === false) { 
        // 'foo:bar:baz.txt' => 'foo:bar:baz'
        //http://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript
        id = id.replace(/\.[^/.]+$/, '');  
      }; 

      if (options.flat === true) { 
        // 'foo:bar:baz.txt' => 'baz.txt'
        // 'foo:bar:baz' => 'baz'
        id = id.split(':').reverse()[0]; 
      }; 

      var contents = file.contents.toString("utf-8");
      nconf.set(guid + ':' + id, contents);

      //
      // Create file which will become the JSON blob.
      //
      var out = new gutil.File({
        base: first.base,
        cwd: first.cwd,
        path: path.join(file.base, dest),
        contents: new Buffer(JSON.stringify(nconf.get(guid), null, 2))
      });

      this.push(out);
      callback();
    } catch (e) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Error:', e));
      callback(e);
    }

  });

};
