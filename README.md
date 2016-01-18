
[gulp](http://gulpjs.com/)-file-contents-to-json
================================================

Slurp in some files, output a JSON representation of their contents.

Check out the broccoli equivalent [here](https://github.com/briangonzalez/broccoli-file-contents-to-json).

Installation
------------

```shell
$ npm install gulp-file-contents-to-json
```


How it works
------------

Given a nested directory of files like so,

```
my-files
├── bar.txt
├── foo.txt
└── my-folder
    └── baz.txt
```

**gulp-file-contents-to-json** reads in each file, and outputs a _single JSON file_ representing the _contents_ of each file within the folder. When a directory is encountered, it becomes a nested object within the JSON blob, like so:

```json
{
  "bar.txt": "Content of bar.",
  "foo.txt": "Contents of foo.",
  "my-folder": {
    "baz.txt": "Contents of baz."
  }
}
```

How to Use
----------

For example, to read in the contents of the `my-files` folder and output `dist/contents.json`, simply add the following gulp task inside `gulpfile.js`:

```javascript
var gulp    = require('gulp');
var fc2json = require('gulp-file-contents-to-json');

gulp.task('create-json-blob', function() {
  gulp.src('my-files/**/*')
      .pipe(fc2json('contents.json'))
      .pipe(gulp.dest('./dist/'));
});
```

Options may be included. `extname` as false removes file extensions and this is useful when wanting dot notation, `flat` as true removes the path and therefore the resulting json object is one layer deep. Be careful to avoid duplicate filenames when using the flat option.

```javascript
      .pipe(fc2json('contents.json', {
        extname : false, // default is true
        flat : true // default is false
      }))
```

Simply run the following and you're done:

```shell
$ gulp create-json-blob
```

Author
----------
| ![twitter/brianmgonzalez](http://gravatar.com/avatar/f6363fe1d9aadb1c3f07ba7867f0e854?s=70](http://twitter.com/brianmgonzalez "Follow @brianmgonzalez on Twitter") |
|---|
| [Brian Gonzalez](http://briangonzalez.org) |


License
--------

MIT
