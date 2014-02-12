var fs = require('fs'),
    jade = require('jade'),
    less = require('less'),
    path = require('path'),
    rimraf = require('rimraf'),
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
  this.precompilerCoffee = false;
  this.precompilerJade = false;
  this.useCSSPrecompiler = false;

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
  }], [{
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
      } else {
        done();
      }
    });
  };

  this.prompt(prompts[0], function (props) {
    that.appName = props.appName;
    that.usePrecompilers = props.usePrecompilers;

    if (that.usePrecompilers) {
      that.prompt(prompts[1], function (props) {
        that.precompilerCoffee = props.precompilerCoffee;
        that.precompilerJS = !props.precompilerCoffee;
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
      that.precompilerJS = true;

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
  this.template('grunt/angular-templates.coffee', 'grunt/angular-templates.coffee');
  this.template('grunt/contrib-watch.coffee', 'grunt/contrib-watch.coffee');
  that.template('grunt/spritesmith.coffee', 'grunt/spritesmith.coffee');

  this.remote('ahmednuaman', 'radian', 'v1.0.2', function (err, remote) {
    var js = that.precompilerCoffee ? 'coffee' : 'js',
        jsDir = that.precompilerCoffee ? 'coffee' : 'javascript',
        testDir = that.precompilerCoffee ? '' : 'js/';

    if (err) {
      done(err);
    }

    remote.copy('.bowerrc', '.bowerrc');
    remote.copy('.editorconfig', '.editorconfig');
    remote.copy('crawler.coffee', 'crawler.coffee');
    remote.copy('server.coffee', 'server.coffee');
    remote.copy('grunt/combine-media-queries.coffee', 'grunt/combine-media-queries.coffee');
    remote.copy('grunt/contrib-clean.coffee', 'grunt/contrib-clean.coffee');
    remote.copy('grunt/contrib-copy.coffee', 'grunt/contrib-copy.coffee');
    remote.copy('grunt/contrib-cssmin.coffee', 'grunt/contrib-cssmin.coffee');
    remote.copy('grunt/contrib-imagemin.coffee', 'grunt/contrib-imagemin.coffee');
    remote.copy('grunt/contrib-requirejs.coffee', 'grunt/contrib-requirejs.coffee');
    remote.copy('grunt/exec.coffee', 'grunt/exec.coffee');
    remote.copy('grunt/express-server.coffee', 'grunt/express-server.coffee');
    remote.copy('grunt/text-replace.coffee', 'grunt/text-replace.coffee');

    that.template('grunt/karma.coffee', 'grunt/karma.coffee');

    if (that.precompilerCoffee) {
      remote.copy('grunt/coffeelint.coffee', 'grunt/coffeelint.coffee');
      remote.copy('grunt/contrib-coffee.coffee', 'grunt/contrib-coffee.coffee');
      remote.copy('grunt/docco.coffee', 'grunt/docco.coffee');
    }

    if (that.precompilerJS) {
      remote.copy('grunt/contrib-jshint.coffee', 'grunt/contrib-jshint.coffee');
      remote.copy('grunt/jscs-checker.coffee', 'grunt/jscs-checker.coffee');
      remote.copy('.jscs.json', '.jscs.json');
      remote.copy('.jshintrc', '.jshintrc');
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
      remote.copy('assets/' + jsDir + '/app.' + js, 'assets/' + js + '/app.' + js);
      remote.copy('assets/' + jsDir + '/partials.' + js, 'assets/' + js + '/partials.' + js);
      remote.copy('assets/' + jsDir + '/startup.' + js, 'assets/' + js + '/startup.' + js);
      remote.copy('test/' + testDir + 'unit/karma.conf.' + js, 'test/unit/karma.conf.' + js);
      remote.copy('test/' + testDir + 'unit/test-main.' + js, 'test/unit/test-main.' + js);

      if (js === 'coffee') {
        remote.copy('test/e2e/protractor.conf.coffee', 'test/e2e/protractor.conf.coffee');
      } else {
        remote.copy('test/js/e2e/protractor.js', 'test/e2e/protractor.js');
      }

      that.mkdir('assets/' + extCSS + '/partial');
      that.mkdir('assets/img');
      that.mkdir('assets/' + js + '/collection');
      that.mkdir('assets/' + js + '/controller');
      that.mkdir('assets/' + js + '/directive');
      that.mkdir('assets/' + js + '/factory');
      that.mkdir('assets/' + js + '/service');
      that.mkdir('assets/' + js + '/vo');
      that.mkdir('assets/partial');
      that.mkdir('test/unit/collection');
      that.mkdir('test/unit/controller');
      that.mkdir('test/unit/directive');
      that.mkdir('test/unit/factory');
      that.mkdir('test/unit/service');
      that.mkdir('test/unit/vo');

      remote.copy('assets/' + jsDir + '/controller/radian-controller.' + js, 'assets/' + js + '/controller/radian-controller.' + js);
      remote.copy('assets/' + jsDir + '/directive/radian-directive.' + js, 'assets/' + js + '/directive/radian-directive.' + js);
      remote.copy('assets/' + jsDir + '/factory/radian-factory.' + js, 'assets/' + js + '/factory/radian-factory.' + js);
      remote.copy('assets/' + jsDir + '/filter/radian-filter.' + js, 'assets/' + js + '/filter/radian-filter.' + js);
      remote.copy('assets/' + jsDir + '/service/radian-service.' + js, 'assets/' + js + '/service/radian-service.' + js);
      remote.copy('assets/' + jsDir + '/helper/radian-module-helper.' + js, 'assets/' + js + '/helper/radian-module-helper.' + js);

      if (that.includeStubs) {
        remote.copy('assets/' + jsDir + '/collection/stub-collection.' + js, 'assets/' + js + '/collection/stub-collection.' + js);
        remote.copy('assets/' + jsDir + '/controller/stub-controller.' + js, 'assets/' + js + '/controller/stub-controller.' + js);
        remote.copy('assets/' + jsDir + '/directive/stub-directive.' + js, 'assets/' + js + '/directive/stub-directive.' + js);
        remote.copy('assets/' + jsDir + '/factory/stub-factory.' + js, 'assets/' + js + '/factory/stub-factory.' + js);
        remote.copy('assets/' + jsDir + '/service/stub-service.' + js, 'assets/' + js + '/service/stub-service.' + js);
        remote.copy('assets/' + jsDir + '/vo/stub-vo.' + js, 'assets/' + js + '/vo/stub-vo.' + js);
        remote.copy('assets/partial/directive/stub-partial.jade', 'assets/partial/directive/stub-partial.jade');
      }

      that.template('assets/' + js + '/_config.' + js, 'assets/' + js + '/config.' + js);
      that.template('assets/' + js + '/routes.' + js, 'assets/' + js + '/routes.' + js);
      that.template('assets/' + js + '/controller/app-controller.' + js, 'assets/' + js + '/controller/app-controller.' + js);

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
      remote.directory('assets/' + jsDir, 'assets/' + js);
      remote.directory('assets/partial', 'assets/partial');
      remote.directory('data', 'data');
      remote.directory('test/' + testDir, 'test');
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
            fs.writeFile(file.replace('.jade', '.html'), html, function () {
              fs.unlink(file, function () {
                cb(files.pop());
              });
            });
          });
        };

        that.expand('assets/partial/**/*.jade', function (err, matches) {
          files = files.concat(matches);

          cb(files.pop());
        });
      }

      if (that.precompilerCoffee) {
        rimraf.sync('test/js');
      }
    });

    done();
  });
};
