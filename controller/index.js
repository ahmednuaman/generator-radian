var util = require('util');
var yeoman = require('yeoman-generator');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a controller called ' + this.name + '.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
  this.template('_template.' + this.config.precompilers.js, 'assets/' + this.config.precompilers.js + '/controller/' + this._.slugify(this.name) + '-controller.' + this.config.precompilers.js);
  this.template('_spec.' + this.config.precompilers.js, 'test/unit/controller/' + this._.slugify(this.name) + '-controller-spec.' + this.config.precompilers.js);
};
