var fs = require('fs'),
    jade = require('jade'),
    less = require('less'),
    path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

module.exports = RadianGenerator;
util.inherits(RadianGenerator, yeoman.generators.Base);

function RadianGenerator (args, options, config) {
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

  this.precompilerSass = false;
  this.precompilerScss = false;
  this.precompilerLess = false;
  this.precompilerStylus = false;
  this.precompilerCoffee = true; //false;
  this.precompilerJade = false;

  prompts = [[{
    name: 'appName',
    message: 'What do you want to call your ngApp?',
    filter: function (input) {
      return input.replace(/\'/g, '');
    }
  }, {
    type: 'confirm',
    name: 'usePrecompilers',
    message: 'Do you want to use any precompilers? (eg: Jade, SASS, SCSS, Stylus or Less)',
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
    name: 'useCSSPrecompiler',
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
        that.useCSSPrecompiler = props.useCSSPrecompiler;

        if (props.useCSSPrecompiler) {
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

RadianGenerator.prototype.app = function () {
  var done = this.async(),
      extCSS = this.precompilerCSS,
      that = this,
      css;

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_index.jade', 'index.jade');
  this.template('gitignore', '.gitignore');
  this.template('radianrc', '.radianrc');
  this.template('Gruntfile.coffee', 'Gruntfile.coffee');
  this.template('grunt/contrib-watch.coffee', 'grunt/contrib-watch.coffee');

  this.remote('ahmednuaman', 'radian', '444791f53c66c80d377ab29d5259a54891c36801', function (err, remote) {
    if (err) {
      done(err);
    }

    remote.copy('.bowerrc', '.bowerrc');
    remote.copy('.editorconfig', '.editorconfig');
    remote.copy('crawler.coffee', 'crawler.coffee');
    remote.copy('server.coffee', 'server.coffee');

    remote.copy('grunt/angular-templates.coffee', 'grunt/angular-templates.coffee');
    remote.copy('grunt/contrib-clean.coffee', 'grunt/contrib-clean.coffee');
    remote.copy('grunt/contrib-copy.coffee', 'grunt/contrib-copy.coffee');
    remote.copy('grunt/contrib-imagemin.coffee', 'grunt/contrib-imagemin.coffee');
    remote.copy('grunt/contrib-requirejs.coffee', 'grunt/contrib-requirejs.coffee');
    remote.copy('grunt/exec.coffee', 'grunt/exec.coffee');
    remote.copy('grunt/express-server.coffee', 'grunt/express-server.coffee');
    remote.copy('grunt/karma.coffee', 'grunt/karma.coffee');
    remote.copy('grunt/spritesmith.coffee', 'grunt/spritesmith.coffee');
    remote.copy('grunt/text-replace.coffee', 'grunt/text-replace.coffee');

    if (that.precompilerCoffee) {
      remote.copy('grunt/coffeelint.coffee', 'grunt/coffeelint.coffee');
      remote.copy('grunt/contrib-coffee.coffee', 'grunt/contrib-coffee.coffee');
      remote.copy('grunt/docco.coffee', 'grunt/docco.coffee');
    }

    if (that.precompilerJade) {
      remote.copy('grunt/jade.coffee', 'grunt/jade.coffee');
    }

    if (that.precompilerSass || that.precompilerScss) {
      remote.copy('grunt/contrib-compass.coffee', 'grunt/contrib-compass.coffee');
    }

    if (that.precompilerLess) {
      remote.copy('grunt/contrib-less.coffee', 'grunt/contrib-less.coffee');
    }

    if (that.precompilerStylus) {
      remote.copy('grunt/contrib-stylus.coffee', 'grunt/contrib-stylus.coffee');
    }

    if (!that.includeExample) {
      remote.copy('assets/coffee/app.coffee', 'assets/coffee/app.coffee');
      remote.copy('assets/coffee/partials.coffee', 'assets/coffee/partials.coffee');
      remote.copy('assets/coffee/startup.coffee', 'assets/coffee/startup.coffee');
      remote.copy('test/e2e/protractor.conf.coffee', 'test/e2e/protractor.conf.coffee');
      remote.copy('test/unit/karma.conf.coffee', 'test/unit/karma.conf.coffee');
      remote.copy('test/unit/test-main.coffee', 'test/unit/test-main.coffee');

      that.mkdir('assets/' + extCSS + '/partial');
      that.mkdir('assets/img');
      that.mkdir('assets/coffee/collection');
      that.mkdir('assets/coffee/controller');
      that.mkdir('assets/coffee/directive');
      that.mkdir('assets/coffee/factory');
      that.mkdir('assets/coffee/service');
      that.mkdir('assets/coffee/vo');
      that.mkdir('assets/partial');
      that.mkdir('test/unit/collection');
      that.mkdir('test/unit/controller');
      that.mkdir('test/unit/directive');
      that.mkdir('test/unit/factory');
      that.mkdir('test/unit/service');
      that.mkdir('test/unit/vo');

      remote.copy('assets/coffee/controller/radian-controller.coffee', 'assets/coffee/controller/radian-controller.coffee');
      remote.copy('assets/coffee/directive/radian-directive.coffee', 'assets/coffee/directive/radian-directive.coffee');
      remote.copy('assets/coffee/factory/radian-factory.coffee', 'assets/coffee/factory/radian-factory.coffee');
      remote.copy('assets/coffee/filter/radian-filter.coffee', 'assets/coffee/filter/radian-filter.coffee');
      remote.copy('assets/coffee/service/radian-service.coffee', 'assets/coffee/service/radian-service.coffee');
      remote.copy('assets/coffee/helper/radian-module-helper.coffee', 'assets/coffee/helper/radian-module-helper.coffee');

      if (that.includeStubs) {
        remote.copy('assets/coffee/collection/stub-collection.coffee', 'assets/coffee/collection/stub-collection.coffee');
        remote.copy('assets/coffee/controller/stub-controller.coffee', 'assets/coffee/controller/stub-controller.coffee');
        remote.copy('assets/coffee/directive/stub-directive.coffee', 'assets/coffee/directive/stub-directive.coffee');
        remote.copy('assets/coffee/factory/stub-factory.coffee', 'assets/coffee/factory/stub-factory.coffee');
        remote.copy('assets/coffee/service/stub-service.coffee', 'assets/coffee/service/stub-service.coffee');
        remote.copy('assets/coffee/vo/stub-vo.coffee', 'assets/coffee/vo/stub-vo.coffee');
        remote.copy('assets/partial/directive/stub-partial.jade', 'assets/partial/directive/stub-partial.jade');
      }

      that.template('assets/coffee/config.coffee', 'assets/coffee/config.coffee');
      that.template('assets/coffee/routes.coffee', 'assets/coffee/routes.coffee');
      that.template('assets/coffee/controller/app-controller.coffee', 'assets/coffee/controller/app-controller.coffee');

      if (that.useCSSPrecompiler) {
        that.template('assets/' + extCSS + '/styles.' + extCSS, 'assets/' + extCSS + '/styles.' + extCSS);
        that.template('assets/' + extCSS + '/_partials.' + extCSS, 'assets/' + extCSS + '/_partials.' + extCSS);
        remote.copy('assets/' + extCSS + '/template.mustache', 'assets/' + extCSS + '/template.mustache');
      } else {
        that.write('assets/' + extCSS + '/styles.' + extCSS, '');
        that.copy('assets/' + extCSS + '/template.mustache', 'assets/' + extCSS + '/template.mustache');
      }
    } else {
      if (that.useCSSPrecompiler) {
        remote.directory('assets/' + extCSS, 'assets/' + extCSS);
      } else {
        that.copy('assets/' + extCSS + '/styles.' + extCSS, 'assets/' + extCSS + '/styles.' + extCSS);
        that.copy('assets/' + extCSS + '/template.mustache', 'assets/' + extCSS + '/template.mustache');
      }

      remote.directory('assets/img', 'assets/img');
      remote.directory('assets/coffee', 'assets/coffee');
      remote.directory('assets/partial', 'assets/partial');
      remote.directory('data', 'data');
      remote.directory('test', 'test');
    }

    that.on('end', function () {
      if (!that.precompilerJade) {
        var files = ['index.jade'],
            opts = {
              pretty: true
            },
            cb;

        cb = function (file) {
          if (!file) {
            return;
          }

          jade.renderFile(file, opts, function (err, html) {
            fs.writeFileSync(file.replace('.jade', '.html'), html);

            fs.unlink(file, function () {
              cb(files.pop());
            });
          });
        };

        that.expand('assets/partial/**/*.jade', function (err, matches) {
          files = files.concat(matches);

          cb(files.pop());
        });
      }
    });

    done();
  });
};