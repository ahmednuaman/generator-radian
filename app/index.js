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

  var prompts = [{
    name: 'appName',
    message: 'What do you want to call your ngApp?'
  }, {
    type: 'confirm',
    name: 'includeExample',
    message: 'Do you want the example site code?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.includeExample = props.includeExample;

    cb();
  }.bind(this));
};

RadianGenerator.prototype.app = function app() {
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_index.jade', 'index.jade');

  this.copy('crawler.coffee', 'crawler.coffee');
  this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
  this.copy('server.coffee', 'server.coffee');
  this.copy('grunt', 'grunt');

  if (!this.includeExample) {
    this.copy('assets/js/app.coffee', 'assets/js/app.coffee');
    this.copy('assets/js/startup.coffee', 'assets/js/startup.coffee');
    this.copy('test/unit/karma.conf.coffee', 'test/unit/karma.conf.coffee');
    this.copy('test/unit/test-main.coffee', 'test/unit/test-main.coffee');

    this.mkdir('assets/js/controller');
    this.mkdir('assets/css/partial');
    this.mkdir('assets/img');
    this.mkdir('assets/js/collection');
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
  } else {
    this.copy('assets', 'assets');
    this.copy('test', 'test');
  }

  this.template('assets/css/styles.sass', 'assets/css/styles.sass');
  this.template('assets/js/config.coffee', 'assets/js/config.coffee');
  this.template('assets/js/routes.coffee', 'assets/js/routes.coffee');
  this.template('assets/js/controller/app-controller.coffee', 'assets/js/controller/app-controller.coffee');
};

RadianGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
};
