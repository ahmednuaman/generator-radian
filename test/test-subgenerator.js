var _ = require('underscore.string');
var helpers = require('yeoman-generator').test;
var path = require('path');
var i = 100;
var app;

describe('Radian generator:', function () {
  var generatorTest = function (generatorType, done, html, css) {
    var name = 'foo bar';
    var deps = [path.join('../../../', generatorType)];
    var config = {
      'appName': name,
      'includeExample': false,
      'includeStubs': false
    };

    config.precompilerJade = html === 'jade';
    config.useCSSPrecompiler = css !== 'css' && !!css;
    config.usePrecompilers = config.useCSSPrecompiler || config.precompilerJade;

    if (config.useCSSPrecompiler) {
      config.precompilerCSS = css;

      if (css === 'styl') {
        config.precompilerCSS = 'stylus';
      }
    }

    helpers.mockPrompt(app, config);

    app.run({}, function () {
      var generator = helpers.createGenerator('radian:' + generatorType, deps, [name]);

      helpers.assertFile('.radianrc');

      generator.run({}, function () {
        var files = generatorType === 'partial' ?
          [
            'assets/' + css + '/partial/_' + _.slugify(name) + '.' + css,
            'assets/partial/' + _.slugify(name) + '-partial.' + html
          ] :
          [
            'assets/coffee/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '.coffee',
            'test/unit/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '-spec.coffee'
          ],
          method;

        helpers.assertFiles(files);

        if (generatorType === 'partial') {
          helpers.assertFile('assets/' + css + '/partial/_' + _.slugify(name) + '.' + css, new RegExp('#' + _.slugify(name)));

          if (css !== 'css') {
            helpers.assertFile('assets/' + css + '/_partials.' + css, new RegExp(_.slugify(name)));
          }

          if (html === 'html') {
            helpers.assertFile('assets/partial/' + _.slugify(name) + '-partial.' + html, new RegExp('<div id="' + _.slugify(name) + '"'));
          } else {
            helpers.assertFile('assets/partial/' + _.slugify(name) + '-partial.' + html, new RegExp('div#' + _.slugify(name)));
          }

        } else if (generatorType !== 'collection' && generatorType !== 'vo') {
          method = generatorType === 'controller' || generatorType === 'service' ? _.classify : _.camelize;

          helpers.assertFile(
            'assets/coffee/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '.coffee',
            new RegExp(method(name + ' ' + (generatorType !== 'filter' && generatorType !== 'directive' ? generatorType : '')))
          );
          helpers.assertFile(
            'test/unit/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '-spec.coffee',
            new RegExp(_.slugify(name + ' ' + generatorType))
          );
        }

        done();
      });
    });
  };

  beforeEach(function (done) {
    var dir = path.join(__dirname, 'temp/' + ++i);

    helpers.testDirectory(dir, function (err) {
      if (err) {
        return done(err);
      }

      app = helpers.createGenerator('radian:app', [
        '../../../app'
      ]);
      app.options['skip-install'] = true;

      done();
    });
  });

  it('should create a stub controller', function (done) {
    generatorTest('controller', done);
  });

  it('should create a stub service', function (done) {
    generatorTest('service', done);
  });

  it('should create a stub factory', function (done) {
    generatorTest('factory', done);
  });

  it('should create a stub filter', function (done) {
    generatorTest('filter', done);
  });

  it('should create a stub directive', function (done) {
    generatorTest('directive', done);
  });

  it('should create a stub collection', function (done) {
    generatorTest('collection', done);
  });

  it('should create a stub vo', function (done) {
    generatorTest('vo', done);
  });

  describe('using Jade precompiler:', function () {
    it('should create a css partial', function (done) {
      generatorTest('partial', done, 'jade', 'css');
    });

    it('should create a sass partial', function (done) {
      generatorTest('partial', done, 'jade', 'sass');
    });

    it('should create a scss partial', function (done) {
      generatorTest('partial', done, 'jade', 'scss');
    });

    it('should create a less partial', function (done) {
      generatorTest('partial', done, 'jade', 'less');
    });

    it('should create a stylus partial', function (done) {
      generatorTest('partial', done, 'jade', 'styl');
    });
  });

  describe('using HTML:', function () {
    it('should create a css partial', function (done) {
      generatorTest('partial', done, 'html', 'css');
    });

    it('should create a sass partial', function (done) {
      generatorTest('partial', done, 'html', 'sass');
    });

    it('should create a scss partial', function (done) {
      generatorTest('partial', done, 'html', 'scss');
    });

    it('should create a less partial', function (done) {
      generatorTest('partial', done, 'html', 'less');
    });

    it('should create a stylus partial', function (done) {
      generatorTest('partial', done, 'html', 'styl');
    });
  });
});
