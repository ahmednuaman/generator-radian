var _ = require('underscore.string');
var helpers = require('yeoman-generator').test;
var path = require('path');
var i = 100;
var app;

describe('Radian generator:', function () {
  var generatorTest = function (generatorType, done, html, css, js) {
    var name = 'foo bar';
    var deps = [path.join('../../../', generatorType)];
    var config = {
      'appName': name,
      'includeExample': false,
      'includeStubs': false
    };

    config.precompilerJS = js === 'js';
    config.precompilerCoffee = !config.precompilerJS;
    config.precompilerJade = html === 'jade';
    config.useCSSPrecompiler = css !== 'css' && !!css;
    config.usePrecompilers = config.useCSSPrecompiler || config.precompilerJade || config.precompilerCoffee;

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
            'assets/' + js + '/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '.' + js,
            'test/unit/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '-spec.' + js
          ],
          method;

        helpers.assertFiles(files);

        if (generatorType === 'partial') {
          helpers.assertFileContent('assets/' + css + '/partial/_' + _.slugify(name) + '.' + css, new RegExp('#' + _.slugify(name)));

          if (css !== 'css') {
            helpers.assertFileContent('assets/' + css + '/_partials.' + css, new RegExp(_.slugify(name)));
          }

          if (html === 'html') {
            helpers.assertFileContent('assets/partial/' + _.slugify(name) + '-partial.' + html, new RegExp('<div id="' + _.slugify(name) + '"'));
          } else {
            helpers.assertFileContent('assets/partial/' + _.slugify(name) + '-partial.' + html, new RegExp('div#' + _.slugify(name)));
          }

        } else if (generatorType !== 'collection' && generatorType !== 'vo') {
          method = generatorType === 'controller' ? _.classify : _.camelize;

          helpers.assertFileContent(
            'assets/' + js + '/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '.' + js,
            new RegExp(method(name + ' ' + (generatorType !== 'filter' && generatorType !== 'directive' ? generatorType : '')))
          );
          helpers.assertFileContent(
            'test/unit/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '-spec.' + js,
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

  describe('using CoffeeScript precompiler:', function () {
    it('should create a stub controller', function (done) {
      generatorTest('controller', done, null, null, 'coffee');
    });

    it('should create a stub service', function (done) {
      generatorTest('service', done, null, null, 'coffee');
    });

    it('should create a stub factory', function (done) {
      generatorTest('factory', done, null, null, 'coffee');
    });

    it('should create a stub filter', function (done) {
      generatorTest('filter', done, null, null, 'coffee');
    });

    it('should create a stub directive', function (done) {
      generatorTest('directive', done, null, null, 'coffee');
    });

    it('should create a stub collection', function (done) {
      generatorTest('collection', done, null, null, 'coffee');
    });

    it('should create a stub vo', function (done) {
      generatorTest('vo', done, null, null, 'coffee');
    });
  });

  describe('using JS:', function () {
    it('should create a stub controller', function (done) {
      generatorTest('controller', done, null, null, 'js');
    });

    it('should create a stub service', function (done) {
      generatorTest('service', done, null, null, 'js');
    });

    it('should create a stub factory', function (done) {
      generatorTest('factory', done, null, null, 'js');
    });

    it('should create a stub filter', function (done) {
      generatorTest('filter', done, null, null, 'js');
    });

    it('should create a stub directive', function (done) {
      generatorTest('directive', done, null, null, 'js');
    });

    it('should create a stub collection', function (done) {
      generatorTest('collection', done, null, null, 'js');
    });

    it('should create a stub vo', function (done) {
      generatorTest('vo', done, null, null, 'js');
    });
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
