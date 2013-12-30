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
    } else {
      cb();
    }
  }.bind(this));
};

RadianGenerator.prototype.app = function app() {
  var done = this.async();

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_index.jade', 'index.jade');

  this.remote('ahmednuaman', 'radian', 'v0.2.0', function (err, remote) {
    remote.copy('.bowerrc', '.bowerrc');
    remote.copy('.editorconfig', '.editorconfig');
    remote.copy('.gitignore', '.gitignore');
    remote.copy('crawler.coffee', 'crawler.coffee');
    remote.copy('Gruntfile.coffee', 'Gruntfile.coffee');
    remote.copy('server.coffee', 'server.coffee');
    remote.copy('assets/css/styles.sass', 'assets/css/styles.sass');

    remote.directory('grunt', 'grunt');

    if (!this.includeExample) {
      remote.copy('assets/js/app.coffee', 'assets/js/app.coffee');
      // remote.copy('assets/js/partials.coffee', 'assets/js/partials.coffee'); not til this is implemented on radian
      remote.copy('assets/js/startup.coffee', 'assets/js/startup.coffee');
      remote.copy('test/unit/karma.conf.coffee', 'test/unit/karma.conf.coffee');
      remote.copy('test/unit/test-main.coffee', 'test/unit/test-main.coffee');

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

      if (this.includeStubs) {
        remote.copy('assets/js/collection/stub-collection.coffee', 'assets/js/collection/stub-collection.coffee');
        remote.copy('assets/js/controller/stub-controller.coffee', 'assets/js/controller/stub-controller.coffee');
        remote.copy('assets/js/directive/stub-directive.coffee', 'assets/js/directive/stub-directive.coffee');
        remote.copy('assets/js/factory/stub-factory.coffee', 'assets/js/factory/stub-factory.coffee');
        remote.copy('assets/js/service/stub-service.coffee', 'assets/js/service/stub-service.coffee');
        remote.copy('assets/js/vo/stub-vo.coffee', 'assets/js/vo/stub-vo.coffee');
        remote.copy('assets/partial/directive/stub-partial.jade', 'assets/partial/directive/stub-partial.jade');
      }

      this.template('assets/css/_partials.sass', 'assets/css/_partials.sass');
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