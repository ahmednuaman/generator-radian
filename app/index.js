'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var RadianGenerator = module.exports = function RadianGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(RadianGenerator, yeoman.generators.Base);

RadianGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var skipToExampleAndStubs = function () {
    this.precompilerJS = this.precompilerCoffee ? 'coffee' : 'js';
    this.precompilerHTML = this.precompilerJade ? 'jade' : 'html';
    this.precompilerCSS = this.precompilerCSS || 'css';

    prompts = [{
      type: 'confirm',
      name: 'includeExample',
      message: 'Do you want the example files?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.includeExample = props.includeExample;

      if (!this.includeExample) {
        prompts = [{
          type: 'confirm',
          name: 'includeStubs',
          message: 'Do you want the stub files?',
          default: true
        }];

        this.prompt(prompts, function (props) {
          this.includeStubs = props.includeStubs;

          cb();
        }.bind(this));
      }
    }.bind(this));
  }.bind(this);

  var prompts = [{
    name: 'appName',
    message: 'What do you want to call your ngApp?',
    filter: function (input) {
      return input.replace(/\'/g, '');
    }
  }, {
    type: 'confirm',
    name: 'usePrecompilers',
    message: 'Do you want to use any precompilers? (eg CoffeeScript, Jade, SASS, SCSS, Stylus or Less)',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.usePrecompilers = props.usePrecompilers;

    if (this.usePrecompilers) {
      prompts = [{
        type: 'confirm',
        name: 'precompilerCoffee',
        message: 'Do you want to use CoffeeScript instead of JavaScript? (http://coffeescript.org)',
        default: true
      }, {
        type: 'confirm',
        name: 'precompilerJade',
        message: 'Do you want to use Jade instead of HTML? (http://jade-lang.com)',
        default: true
      }, {
        type: 'confirm',
        name: 'precompilerCSS',
        message: 'Do you want to use a CSS precompiler?',
        default: true
      }];

      this.prompt(prompts, function (props) {
        this.precompilerCoffee = props.precompilerCoffee;
        this.precompilerJade = props.precompilerJade;

        if (props.precompilerCSS) {
          prompts = [{
            type: 'list',
            name: 'precompilerCSS',
            message: 'What CSS precompiler do you want to use? (Choose either sass, scss, stylus or less)',
            choices: ['sass', 'scss', 'stylus', 'less']
          }];

          this.prompt(prompts, function (props) {
            this.precompilerCSS = props.precompilerCSS;

            switch (this.precompilerCSS) {
              case 'sass':
                this.precompilerSass = true;

                break;

              case 'scss':
                this.precompilerScss = true;

                break;

              case 'less':
                this.precompilerLess = true;

                break;

              case 'stylus':
                this.precompilerStylus = true;

                break;
            }

            skipToExampleAndStubs();
          }.bind(this));
        } else {
          skipToExampleAndStubs();
        }
      }.bind(this));
    } else {
      skipToExampleAndStubs();
    }
  }.bind(this));
};

RadianGenerator.prototype.app = function app() {
  var done = this.async(),
      extCSS = '.' + (this.precompilerCSS || 'sass');

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_index.jade', 'index.jade');
  this.template('_radianrc', '.radianrc');

  this.remote('ahmednuaman', 'radian', 'feature-29-an', function (err, remote) {
    remote.copy('.bowerrc', '.bowerrc');
    remote.copy('.editorconfig', '.editorconfig');
    remote.copy('.gitignore', '.gitignore');
    remote.copy('crawler.coffee', 'crawler.coffee');
    remote.copy('Gruntfile.coffee', 'Gruntfile.coffee');
    remote.copy('server.coffee', 'server.coffee');

    remote.directory('grunt', 'grunt');

    if (!this.includeExample) {
      remote.copy('assets/js/app.coffee', 'assets/js/app.coffee');
      remote.copy('assets/js/partials.coffee', 'assets/js/partials.coffee');
      remote.copy('assets/js/startup.coffee', 'assets/js/startup.coffee');
      remote.copy('test/unit/karma.conf.coffee', 'test/unit/karma.conf.coffee');
      remote.copy('test/unit/test-main.coffee', 'test/unit/test-main.coffee');

      this.mkdir('assets/css/partial');
      this.mkdir('assets/img');
      this.mkdir('assets/js/collection');
      this.mkdir('assets/js/controller');
      this.mkdir('assets/js/directive');
      this.mkdir('assets/js/factory');
      this.mkdir('assets/js/service');
      this.mkdir('assets/js/vo');
      this.mkdir('assets/partial');
      this.mkdir('test/unit/collection');
      this.mkdir('test/unit/controller');
      this.mkdir('test/unit/directive');
      this.mkdir('test/unit/factory');
      this.mkdir('test/unit/service');
      this.mkdir('test/unit/vo');

      remote.copy('assets/js/controller/radian-controller.coffee', 'assets/js/controller/radian-controller.coffee');
      remote.copy('assets/js/directive/radian-directive.coffee', 'assets/js/directive/radian-directive.coffee');
      remote.copy('assets/js/factory/radian-factory.coffee', 'assets/js/factory/radian-factory.coffee');
      remote.copy('assets/js/filter/radian-filter.coffee', 'assets/js/filter/radian-filter.coffee');
      remote.copy('assets/js/service/radian-service.coffee', 'assets/js/service/radian-service.coffee');
      remote.copy('assets/js/helper/radian-module-helper.coffee', 'assets/js/helper/radian-module-helper.coffee');

      if (this.includeStubs) {
        remote.copy('assets/js/collection/stub-collection.coffee', 'assets/js/collection/stub-collection.coffee');
        remote.copy('assets/js/controller/stub-controller.coffee', 'assets/js/controller/stub-controller.coffee');
        remote.copy('assets/js/directive/stub-directive.coffee', 'assets/js/directive/stub-directive.coffee');
        remote.copy('assets/js/factory/stub-factory.coffee', 'assets/js/factory/stub-factory.coffee');
        remote.copy('assets/js/service/stub-service.coffee', 'assets/js/service/stub-service.coffee');
        remote.copy('assets/js/vo/stub-vo.coffee', 'assets/js/vo/stub-vo.coffee');
        remote.copy('assets/partial/directive/stub-partial.jade', 'assets/partial/directive/stub-partial.jade');
      }

      this.template('assets/css/styles' + extCSS, 'assets/css/styles' + extCSS);
      this.template('assets/css/_partials' + extCSS, 'assets/css/_partials' + extCSS);
      this.template('assets/js/config.coffee', 'assets/js/config.coffee');
      this.template('assets/js/routes.coffee', 'assets/js/routes.coffee');
      this.template('assets/js/controller/app-controller.coffee', 'assets/js/controller/app-controller.coffee');
    } else {
      remote.directory('assets', 'assets');
      remote.directory('data', 'data');
      remote.directory('test', 'test');
    }

    done();
  }.bind(this));
};