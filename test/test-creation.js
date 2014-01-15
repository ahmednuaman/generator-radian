var helpers = require('yeoman-generator').test;
var path = require('path');

var alwaysExpected = [
  'bower.json',
  'package.json',
  '.gitignore',
  '.radianrc',
  'Gruntfile.coffee',
  'grunt/contrib-watch.coffee',
  '.bowerrc',
  '.editorconfig',
  'crawler.coffee',
  'server.coffee',
  'grunt/angular-templates.coffee',
  'grunt/contrib-clean.coffee',
  'grunt/contrib-copy.coffee',
  'grunt/contrib-imagemin.coffee',
  'grunt/contrib-requirejs.coffee',
  'grunt/exec.coffee',
  'grunt/express-server.coffee',
  'grunt/karma.coffee',
  'grunt/spritesmith.coffee',
  'grunt/text-replace.coffee',
  'grunt/coffeelint.coffee',
  'grunt/contrib-coffee.coffee',
  'grunt/docco.coffee',
  'assets/coffee/app.coffee',
  'assets/coffee/partials.coffee',
  'assets/coffee/startup.coffee',
  'test/e2e/protractor.conf.coffee',
  'test/unit/karma.conf.coffee',
  'test/unit/test-main.coffee',
  'assets/coffee/controller/radian-controller.coffee',
  'assets/coffee/directive/radian-directive.coffee',
  'assets/coffee/factory/radian-factory.coffee',
  'assets/coffee/filter/radian-filter.coffee',
  'assets/coffee/service/radian-service.coffee',
  'assets/coffee/helper/radian-module-helper.coffee',
  'assets/coffee/config.coffee',
  'assets/coffee/routes.coffee',
  'assets/coffee/controller/app-controller.coffee'
];
var alwaysExpectedCSS = [
  'assets/css/styles.css',
  'assets/css/template.mustache'
];
var alwaysExpectedLess = [
  'assets/less/styles.less',
  'assets/less/_partials.less',
  'assets/less/template.mustache',
  'grunt/contrib-less.coffee'
];
var alwaysExpectedSass = [
  'assets/sass/styles.sass',
  'assets/sass/_partials.sass',
  'assets/sass/template.mustache',
  'grunt/contrib-compass.coffee'
];
var alwaysExpectedScss = [
  'assets/scss/styles.scss',
  'assets/scss/_partials.scss',
  'assets/scss/template.mustache',
  'grunt/contrib-compass.coffee'
];
var alwaysExpectedStylus = [
  'assets/styl/styles.styl',
  'assets/styl/_partials.styl',
  'assets/styl/template.mustache',
  'grunt/contrib-stylus.coffee'
];
var alwaysExpectedJade = [
  'index.jade',
  'grunt/jade.coffee'
];

var stubsExpectedCoffee = [
  'assets/coffee/collection/stub-collection.coffee',
  'assets/coffee/controller/stub-controller.coffee',
  'assets/coffee/directive/stub-directive.coffee',
  'assets/coffee/factory/stub-factory.coffee',
  'assets/coffee/service/stub-service.coffee',
  'assets/coffee/vo/stub-vo.coffee'
];
var stubsExpectedJade = [
  'assets/partial/directive/stub-partial.jade'
];
var stubsExpectedHTML = [
  'assets/partial/directive/stub-partial.html'
];

var exampleExpected = [
  'assets/img/logo.ai',
  'assets/img/logo.png',
  'assets/img/logo.svg',
  'assets/coffee/collection/menu-items-collection.coffee',
  'assets/coffee/controller/error-controller.coffee',
  'assets/coffee/controller/footer-controller.coffee',
  'assets/coffee/controller/header/header-controller.coffee',
  'assets/coffee/controller/header/header-menu-controller.coffee',
  'assets/coffee/controller/home-controller.coffee',
  'assets/coffee/directive/menu-component-directive.coffee',
  'assets/coffee/factory/menu-factory.coffee',
  'assets/coffee/factory/page-error-factory.coffee',
  'assets/coffee/factory/page-title-factory.coffee',
  'assets/coffee/service/menu-service.coffee',
  'assets/coffee/vo/menu-item-vo.coffee',
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
var exampleExpectedLess = [
  'assets/less/partial/_app.less',
  'assets/less/partial/_cta.less',
  'assets/less/partial/_footer.less',
  'assets/less/partial/_global.less',
  'assets/less/partial/_header.less',
  'assets/less/partial/_menu.less',
  'assets/less/partial/_mixins.less',
  'assets/less/styles.less',
  'assets/less/_partials.less',
  'assets/less/template.mustache',
  'grunt/contrib-less.coffee'
];
var exampleExpectedSass = [
  'assets/sass/partial/_app.sass',
  'assets/sass/partial/_cta.sass',
  'assets/sass/partial/_footer.sass',
  'assets/sass/partial/_global.sass',
  'assets/sass/partial/_header.sass',
  'assets/sass/partial/_menu.sass',
  'assets/sass/partial/_mixins.sass',
  'assets/sass/styles.sass',
  'assets/sass/_partials.sass',
  'assets/sass/template.mustache',
  'grunt/contrib-compass.coffee'
];
var exampleExpectedScss = [
  'assets/scss/partial/_app.scss',
  'assets/scss/partial/_cta.scss',
  'assets/scss/partial/_footer.scss',
  'assets/scss/partial/_global.scss',
  'assets/scss/partial/_header.scss',
  'assets/scss/partial/_menu.scss',
  'assets/scss/partial/_mixins.scss',
  'assets/scss/styles.scss',
  'assets/scss/_partials.scss',
  'assets/scss/template.mustache',
  'grunt/contrib-compass.coffee'
];
var exampleExpectedStylus = [
  'assets/styl/partial/_app.styl',
  'assets/styl/partial/_cta.styl',
  'assets/styl/partial/_footer.styl',
  'assets/styl/partial/_global.styl',
  'assets/styl/partial/_header.styl',
  'assets/styl/partial/_menu.styl',
  'assets/styl/partial/_mixins.styl',
  'assets/styl/styles.styl',
  'assets/styl/_partials.styl',
  'assets/styl/template.mustache',
  'grunt/contrib-stylus.coffee'
];
var exampleExpectedJade = [
  'assets/partial/code-partial.jade',
  'assets/partial/cta-partial.jade',
  'assets/partial/directive/menu-component-partial.jade',
  'assets/partial/error-partial.jade',
  'assets/partial/footer-partial.jade',
  'assets/partial/header/header-menu-partial.jade',
  'assets/partial/header/header-partial.jade',
  'assets/partial/home-partial.jade'
];
var exampleExpectedHTML = [
  'assets/partial/code-partial.html',
  'assets/partial/cta-partial.html',
  'assets/partial/directive/menu-component-partial.html',
  'assets/partial/error-partial.html',
  'assets/partial/footer-partial.html',
  'assets/partial/header/header-menu-partial.html',
  'assets/partial/header/header-partial.html',
  'assets/partial/home-partial.html'
];
var i = 0;
var radianrc = '.radianrc';
var app;

describe('Radian generator:', function () {
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

  describe('no examples, no stubs:', function () {
    it('should use no precompilers (except for coffee, for now...)', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': false,
        'includeExample': false,
        'includeStubs': false
      });

      app.run({}, function () {
        setTimeout(function () {
          helpers.assertFiles(alwaysExpected
            .concat('index.html'));
          helpers.assertFile(radianrc, new RegExp('"js": "coffee"'));
          helpers.assertFile(radianrc, new RegExp('"css": "css"'));
          helpers.assertFile(radianrc, new RegExp('"html": "html"'));
          done();
        }, 500);
      });
    });

    it('should use jade', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'precompilerJade': true,
        'includeExample': false,
        'includeStubs': false
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(alwaysExpectedJade));
          helpers.assertFile(radianrc, new RegExp('"html": "jade"'));
        done();
      });
    });

    it('should use sass', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'sass',
        'includeExample': false,
        'includeStubs': false
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(alwaysExpectedSass));
          helpers.assertFile(radianrc, new RegExp('"css": "sass"'));
        done();
      });
    });

    it('should use scss', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'scss',
        'includeExample': false,
        'includeStubs': false
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(alwaysExpectedScss));
          helpers.assertFile(radianrc, new RegExp('"css": "scss"'));
        done();
      });
    });

    it('should use less', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'less',
        'includeExample': false,
        'includeStubs': false
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(alwaysExpectedLess));
          helpers.assertFile(radianrc, new RegExp('"css": "less"'));
        done();
      });
    });

    it('should use stylus', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'stylus',
        'includeExample': false,
        'includeStubs': false
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(alwaysExpectedStylus));
          helpers.assertFile(radianrc, new RegExp('"css": "styl"'));
        done();
      });
    });
  });

  describe('no examples, yes stubs:', function () {
    it('should use no precompilers (except for coffee, for now...)', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': false,
        'includeExample': false,
        'includeStubs': true
      });

      app.run({}, function () {
        setTimeout(function () {
          helpers.assertFiles(alwaysExpected
            .concat(stubsExpectedCoffee)
            .concat(stubsExpectedHTML)
            .concat('index.html'));
          done();
        }, 500);
      });
    });

    it('should use jade', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'precompilerJade': true,
        'includeExample': false,
        'includeStubs': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(alwaysExpectedJade)
          .concat(stubsExpectedJade));
        done();
      });
    });

    it('should use sass', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'sass',
        'includeExample': false,
        'includeStubs': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(alwaysExpectedSass));
        done();
      });
    });

    it('should use scss', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'scss',
        'includeExample': false,
        'includeStubs': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(alwaysExpectedScss));
        done();
      });
    });

    it('should use less', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'less',
        'includeExample': false,
        'includeStubs': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(alwaysExpectedLess));
        done();
      });
    });

    it('should use stylus', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'stylus',
        'includeExample': false,
        'includeStubs': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(alwaysExpectedStylus));
        done();
      });
    });
  });

  describe('yes examples, yes stubs:', function () {
    it('should use no precompilers (except for coffee, for now...)', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': false,
        'includeExample': true
      });

      app.run({}, function () {
        setTimeout(function () {
          helpers.assertFiles(alwaysExpected
            .concat(stubsExpectedCoffee)
            .concat(exampleExpected)
            .concat(stubsExpectedHTML)
            .concat(exampleExpectedHTML)
            .concat('index.html'));
          done();
        }, 500);
      });
    });

    it('should use jade', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'precompilerJade': true,
        'includeExample': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(exampleExpected)
          .concat(alwaysExpectedJade)
          .concat(stubsExpectedJade)
          .concat(exampleExpectedJade));
        done();
      });
    });

    it('should use sass', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'sass',
        'includeExample': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(exampleExpected)
          .concat(alwaysExpectedSass)
          .concat(exampleExpectedSass));
        done();
      });
    });

    it('should use scss', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'scss',
        'includeExample': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(exampleExpected)
          .concat(alwaysExpectedScss)
          .concat(exampleExpectedScss));
        done();
      });
    });

    it('should use less', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'less',
        'includeExample': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(exampleExpected)
          .concat(alwaysExpectedLess)
          .concat(exampleExpectedLess));
        done();
      });
    });

    it('should use stylus', function (done) {
      helpers.mockPrompt(app, {
        'appName': 'foo bar',
        'usePrecompilers': true,
        'useCSSPrecompiler': true,
        'precompilerCSS': 'stylus',
        'includeExample': true
      });

      app.run({}, function () {
        helpers.assertFiles(alwaysExpected
          .concat(stubsExpectedCoffee)
          .concat(exampleExpected)
          .concat(alwaysExpectedStylus)
          .concat(exampleExpectedStylus));
        done();
      });
    });
  });
});
