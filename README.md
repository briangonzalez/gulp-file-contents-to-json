
[gulp](http://gulpjs.com/)-file-contents-to-json
================================================

Slurp in some files, output a JSON representation of their contents.

Installation

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
  "bar.txt": "This is bar.",
  "foo.txt": "This is foo.",
  "my-folder": {
    "baz.txt": "This is baz."
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
