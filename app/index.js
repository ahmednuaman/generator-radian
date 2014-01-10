var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

module.exports = RadianGenerator;
util.inherits(RadianGenerator, yeoman.generators.Base);

function RadianGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

RadianGenerator.prototype.askFor = function () {
  var done = this.async(),
      that = this,
      prompts,
      skipToExampleAndStubs;

  prompts = [[{
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
  }], [/*{
    type: 'confirm',
    name: 'precompilerCoffee',
    message: 'Do you want to use CoffeeScript instead of JavaScript? (http://coffeescript.org)',
    default: true
  }, */{
    type: 'confirm',
    name: 'precompilerJade',
    message: 'Do you want to use Jade instead of HTML? (http://jade-lang.com)',
    default: true
  }, {
    type: 'confirm',
    name: 'precompilerCSS',
    message: 'Do you want to use a CSS precompiler?',
    default: true
  }], [{
    type: 'list',
    name: 'precompilerCSS',
    message: 'What CSS precompiler do you want to use? (Choose either sass, scss, stylus or less)',
    choices: ['sass', 'scss', 'stylus', 'less']
  }], [{
    type: 'confirm',
    name: 'includeExample',
    message: 'Do you want the example files?',
    default: true
  }], [{
    type: 'confirm',
    name: 'includeStubs',
    message: 'Do you want the stub files?',
    default: true
  }]];

  console.log(this.yeoman);

  skipToExampleAndStubs = function () {
    that.precompilerJS = that.precompilerCoffee ? 'coffee' : 'js';
    that.precompilerHTML = that.precompilerJade ? 'jade' : 'html';
    that.precompilerCSS = that.precompilerCSS || 'css';

    that.prompt(prompts[3], function (props) {
      that.includeExample = props.includeExample;

      if (!that.includeExample) {
        that.prompt(prompts[4], function (props) {
          that.includeStubs = props.includeStubs;

          done();
        });
      }
    });
  };

  this.prompt(prompts[0], function (props) {
    that.appName = props.appName;
    that.usePrecompilers = props.usePrecompilers;

    if (that.usePrecompilers) {
      that.prompt(prompts[1], function (props) {
        that.precompilerCoffee = true; //props.precompilerCoffee;
        that.precompilerJade = props.precompilerJade;

        if (props.precompilerCSS) {
          that.prompt(prompts[2], function (props) {
            that.precompilerCSS = props.precompilerCSS;

            switch (that.precompilerCSS) {
              case 'sass':
                that.precompilerSass = true;

                break;

              case 'scss':
                that.precompilerScss = true;

                break;

              case 'less':
                that.precompilerLess = true;

                break;

              case 'stylus':
                that.precompilerCSS = 'styl';
                that.precompilerStylus = true;

                break;
            }

            skipToExampleAndStubs();
          });
        } else {
          skipToExampleAndStubs();
        }
      });
    } else {
      skipToExampleAndStubs();
    }
  });
};

RadianGenerator.prototype.app = function app() {
  var done = this.async(),
      extCSS = '.' + (this.precompilerCSS || 'sass');

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_index.jade', 'index.jade');
  this.template('_radianrc', '.radianrc');

  this.remote('ahmednuaman', 'radian', 'v0.7.0', function (err, remote) {
    remote.copy('.bowerrc', '.bowerrc');
    remote.copy('.editorconfig', '.editorconfig');
    remote.copy('.gitignore', '.gitignore');
    remote.copy('crawler.coffee', 'crawler.coffee');
    remote.copy('Gruntfile.coffee', 'Gruntfile.coffee');
    remote.copy('server.coffee', 'server.coffee');

    remote.directory('grunt', 'grunt');

    if (!this.includeExample) {
      remote.copy('assets/coffee/app.coffee', 'assets/coffee/app.coffee');
      remote.copy('assets/coffee/partials.coffee', 'assets/coffee/partials.coffee');
      remote.copy('assets/coffee/startup.coffee', 'assets/coffee/startup.coffee');
      remote.copy('test/e2e/protractor.conf.coffee', 'test/e2e/protractor.conf.coffee');
      remote.copy('test/unit/karma.conf.coffee', 'test/unit/karma.conf.coffee');
      remote.copy('test/unit/test-main.coffee', 'test/unit/test-main.coffee');

      this.mkdir('assets/' + extCSS + '/partial');
      this.mkdir('assets/img');
      this.mkdir('assets/coffee/collection');
      this.mkdir('assets/coffee/controller');
      this.mkdir('assets/coffee/directive');
      this.mkdir('assets/coffee/factory');
      this.mkdir('assets/coffee/service');
      this.mkdir('assets/coffee/vo');
      this.mkdir('assets/partial');
      this.mkdir('test/unit/collection');
      this.mkdir('test/unit/controller');
      this.mkdir('test/unit/directive');
      this.mkdir('test/unit/factory');
      this.mkdir('test/unit/service');
      this.mkdir('test/unit/vo');

      remote.copy('assets/coffee/controller/radian-controller.coffee', 'assets/coffee/controller/radian-controller.coffee');
      remote.copy('assets/coffee/directive/radian-directive.coffee', 'assets/coffee/directive/radian-directive.coffee');
      remote.copy('assets/coffee/factory/radian-factory.coffee', 'assets/coffee/factory/radian-factory.coffee');
      remote.copy('assets/coffee/filter/radian-filter.coffee', 'assets/coffee/filter/radian-filter.coffee');
      remote.copy('assets/coffee/service/radian-service.coffee', 'assets/coffee/service/radian-service.coffee');
      remote.copy('assets/coffee/helper/radian-module-helper.coffee', 'assets/coffee/helper/radian-module-helper.coffee');

      if (this.includeStubs) {
        remote.copy('assets/coffee/collection/stub-collection.coffee', 'assets/coffee/collection/stub-collection.coffee');
        remote.copy('assets/coffee/controller/stub-controller.coffee', 'assets/coffee/controller/stub-controller.coffee');
        remote.copy('assets/coffee/directive/stub-directive.coffee', 'assets/coffee/directive/stub-directive.coffee');
        remote.copy('assets/coffee/factory/stub-factory.coffee', 'assets/coffee/factory/stub-factory.coffee');
        remote.copy('assets/coffee/service/stub-service.coffee', 'assets/coffee/service/stub-service.coffee');
        remote.copy('assets/coffee/vo/stub-vo.coffee', 'assets/coffee/vo/stub-vo.coffee');
        remote.copy('assets/partial/directive/stub-partial.jade', 'assets/partial/directive/stub-partial.jade');
      }

      this.template('assets/' + extCSS + '/styles' + extCSS, 'assets/' + extCSS + '/styles' + extCSS);
      this.template('assets/' + extCSS + '/_partials' + extCSS, 'assets/' + extCSS + '/_partials' + extCSS);
      this.template('assets/js/config.coffee', 'assets/coffee/config.coffee');
      this.template('assets/js/routes.coffee', 'assets/coffee/routes.coffee');
      this.template('assets/js/controller/app-controller.coffee', 'assets/coffee/controller/app-controller.coffee');
    } else {
      remote.directory('assets/img', 'assets/img');
      remote.directory('assets/js', 'assets/js');
      remote.directory('assets/partial', 'assets/partial');
      remote.directory('data', 'data');
      remote.directory('test', 'test');

      remote.copy('assets/css/**/*' + extCSS, 'assets/css');

      if (!this.precompilerCSS) {

      }
    }

    done();
  }.bind(this));
};