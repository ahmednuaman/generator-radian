/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var alwaysExpected = [
  'bower.json',
  'package.json',
  'index.jade',
  'crawler.coffee',
  'Gruntfile.coffee',
  'server.coffee',
  'grunt/coffeelint.coffee',
  'grunt/contrib-coffee.coffee',
  'grunt/contrib-compass.coffee',
  'grunt/contrib-copy.coffee',
  'grunt/contrib-imagemin.coffee',
  'grunt/contrib-requirejs.coffee',
  'grunt/contrib-watch.coffee',
  'grunt/docco.coffee',
  'grunt/exec.coffee',
  'grunt/express-server.coffee',
  'grunt/jade.coffee',
  'grunt/karma.coffee',
  'grunt/text-replace.coffee',
  'assets/js/app.coffee',
  'assets/js/startup.coffee',
  'test/unit/karma.conf.coffee',
  'test/unit/test-main.coffee',
  'assets/css/styles.sass',
  'assets/js/config.coffee',
  'assets/js/routes.coffee',
  'assets/js/controller/app-controller.coffee',
  'assets/js/controller/radian-controller.coffee',
  'assets/js/directive/radian-directive.coffee',
  'assets/js/factory/radian-factory.coffee',
  'assets/js/filter/radian-filter.coffee',
  'assets/js/service/radian-service.coffee',
  'assets/js/helper/radian-module-helper.coffee',
  '.bowerrc',
  '.editorconfig',
  '.gitignore'
];
var stubsExpected = [
  'assets/js/collection/stub-collection.coffee',
  'assets/js/controller/stub-controller.coffee',
  'assets/js/directive/stub-directive.coffee',
  'assets/js/factory/stub-factory.coffee',
  'assets/js/service/stub-service.coffee',
  'assets/js/vo/stub-vo.coffee',
  'assets/partial/directive/stub-partial.jade'
];
var exampleExpected = [
  'assets/css/partial/_app.sass',
  'assets/css/partial/_cta.sass',
  'assets/css/partial/_footer.sass',
  'assets/css/partial/_global.sass',
  'assets/css/partial/_header.sass',
  'assets/css/partial/_menu.sass',
  'assets/css/partial/_mixins.sass',
  'assets/img/logo.ai',
  'assets/img/logo.png',
  'assets/img/logo.svg',
  'assets/js/collection/menu-items-collection.coffee',
  'assets/js/controller/error-controller.coffee',
  'assets/js/controller/footer-controller.coffee',
  'assets/js/controller/header/header-controller.coffee',
  'assets/js/controller/header/header-menu-controller.coffee',
  'assets/js/controller/home-controller.coffee',
  'assets/js/directive/menu-component-directive.coffee',
  'assets/js/factory/menu-factory.coffee',
  'assets/js/factory/page-error-factory.coffee',
  'assets/js/factory/page-title-factory.coffee',
  'assets/js/service/menu-service.coffee',
  'assets/js/vo/menu-item-vo.coffee',
  'assets/partial/code-partial.jade',
  'assets/partial/cta-partial.jade',
  'assets/partial/directive/menu-component-partial.jade',
  'assets/partial/error-partial.jade',
  'assets/partial/footer-partial.jade',
  'assets/partial/header/header-menu-partial.jade',
  'assets/partial/header/header-partial.jade',
  'assets/partial/home-partial.jade',
  'test/unit/collection/menu-items-collection-spec.coffee',
  'test/unit/controller/app-controller-spec.coffee',
  'test/unit/controller/error-controller-spec.coffee',
  'test/unit/controller/footer-controller-spec.coffee',
  'test/unit/controller/header/header-controller-spec.coffee',
  'test/unit/controller/header/header-menu-controller-spec.coffee',
  'test/unit/controller/home-controller-spec.coffee',
  'test/unit/directive/menu-component-directive-spec.coffee',
  'test/unit/factory/menu-factory-spec.coffee',
  'test/unit/factory/page-error-factory-spec.coffee',
  'test/unit/factory/page-title-factory-spec.coffee',
  'test/unit/service/menu-service-spec.coffee',
  'test/unit/vo/menu-item-vo-spec.coffee'
];

describe('radian generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('radian:app', [
        '../../app'
      ]);
      this.app.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('creates expected files for a bare-bones set up', function (done) {
    var expected = alwaysExpected;

    helpers.mockPrompt(this.app, {
      'appName': 'foo bar',
      'includeExample': false,
      'includeStubs': false
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files for a bare-bones set up with stubs', function (done) {
    var expected = stubsExpected.concat(alwaysExpected);

    helpers.mockPrompt(this.app, {
      'appName': 'foo bar',
      'includeExample': false,
      'includeStubs': true
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files for a full example set up', function (done) {
    var expected = exampleExpected.concat(alwaysExpected).concat(stubsExpected);

    helpers.mockPrompt(this.app, {
      'appName': 'foo bar',
      'includeExample': true
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
