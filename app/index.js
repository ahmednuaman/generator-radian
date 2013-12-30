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
  var appPath = this.appPath,
      inAppPath;

  inAppPath = function(file) {
    path.join(appPath, file);
  };

  this.template('_bower.json', inAppPath('bower.json'));
  this.template('_package.json', inAppPath('package.json'));
  this.template('_index.jade', inAppPath('index.jade'));

  this.remote('ahmednuaman', 'radian', 'v0.1.4', function (err, remote) {
    remote.copy('bowerrc', inAppPath('.bowerrc'));
    remote.copy('editorconfig', inAppPath('.editorconfig'));
    remote.copy('gitignore', inAppPath('.gitignore'));
    remote.copy('crawler.coffee', inAppPath('crawler.coffee'));
    remote.copy('Gruntfile.coffee', inAppPath('Gruntfile.coffee'));
    remote.copy('server.coffee', inAppPath('server.coffee'));
    remote.copy('assets/css/styles.sass', inAppPath('assets/css/styles.sass'));

    remote.directory('grunt', inAppPath('grunt'));

    if (!this.includeExample) {
      remote.copy('assets/js/app.coffee', inAppPath('assets/js/app.coffee'));
      remote.copy('assets/js/partials.coffee', inAppPath('assets/js/partials.coffee'));
      remote.copy('assets/js/startup.coffee', inAppPath('assets/js/startup.coffee'));
      remote.copy('test/unit/karma.conf.coffee', inAppPath('test/unit/karma.conf.coffee'));
      remote.copy('test/unit/test-main.coffee', inAppPath('test/unit/test-main.coffee'));

      this.mkdir(inAppPath('assets/js/controller'));
      this.mkdir(inAppPath('assets/css/partial'));
      this.mkdir(inAppPath('assets/img'));
      this.mkdir(inAppPath('assets/js/collection'));
      this.mkdir(inAppPath('assets/js/directive'));
      this.mkdir(inAppPath('assets/js/factory'));
      this.mkdir(inAppPath('assets/js/service'));
      this.mkdir(inAppPath('assets/js/vo'));
      this.mkdir(inAppPath('assets/partial'));
      this.mkdir(inAppPath('test/unit/collection'));
      this.mkdir(inAppPath('test/unit/controller'));
      this.mkdir(inAppPath('test/unit/directive'));
      this.mkdir(inAppPath('test/unit/factory'));
      this.mkdir(inAppPath('test/unit/service'));
      this.mkdir(inAppPath('test/unit/vo'));

      if (this.includeStubs) {
        remote.copy('assets/js/collection/stub-collection.coffee', inAppPath('assets/js/collection/stub-collection.coffee'));
        remote.copy('assets/js/controller/stub-controller.coffee', inAppPath('assets/js/controller/stub-controller.coffee'));
        remote.copy('assets/js/directive/stub-directive.coffee', inAppPath('assets/js/directive/stub-directive.coffee'));
        remote.copy('assets/js/factory/stub-factory.coffee', inAppPath('assets/js/factory/stub-factory.coffee'));
        remote.copy('assets/js/service/stub-service.coffee', inAppPath('assets/js/service/stub-service.coffee'));
        remote.copy('assets/js/vo/stub-vo.coffee', inAppPath('assets/js/vo/stub-vo.coffee'));
        remote.copy('assets/partial/directive/stub-partial.jade', inAppPath('assets/partial/directive/stub-partial.jade'));
      }
    } else {
      remote.directory('assets', inAppPath('assets'));
      remote.directory('data', inAppPath('data'));
      remote.directory('test', inAppPath('test'));
    }

    this.template('assets/css/_partials.sass', 'assets/css/_partials.sass');
    this.template('assets/js/config.coffee', 'assets/js/config.coffee');
    this.template('assets/js/routes.coffee', 'assets/js/routes.coffee');
    this.template('assets/js/controller/app-controller.coffee', 'assets/js/controller/app-controller.coffee');
  }.bind(this));
};