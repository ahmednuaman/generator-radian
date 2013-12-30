/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');
var app;

describe('radian generator', function () {
  var generatorTest = function (generatorType, done) {
    var name = 'foo bar';
    var deps = [path.join('../..', generatorType)];
    var generator = helpers.createGenerator('radian:' + generatorType, deps, [name]);

    helpers.mockPrompt(app, {
      'appName': name,
      'includeExample': false,
      'includeStubs': false
    });

    app.run([], function () {
      generator.run([], function () {
        helpers.mockPrompt(app, {
          'overwrite': 'y'
        });

        helpers.assertFiles(
          generatorType === 'partial' ?
            [
              'assets/css/partial/_' + _.slugify(name) + '.sass',
              'assets/partial/' + _.slugify(name) + '-partial.jade'
            ] :
            [
              'assets/js/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '.coffee',
              'test/unit/' + generatorType + '/' + _.slugify(name) + '-' + generatorType + '-spec.coffee'
            ]
        );
        done();
      });
    });
  };

  beforeEach(function (done) {
    app = this.app;

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      app = helpers.createGenerator('radian:app', [
        '../../app'
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

  it('should create a stub directive', function (done) {
    generatorTest('directive', done);
  });

  it('should create a stub collection', function (done) {
    generatorTest('collection', done);
  });

  it('should create a stub vo', function (done) {
    generatorTest('vo', done);
  });

  xit('should create a stub jade and sass partial', function (done) {
    generatorTest('partial', done);
  });
});
