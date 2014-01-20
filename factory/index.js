var util = require('util');
var yeoman = require('yeoman-generator');

var FactoryGenerator = module.exports = function FactoryGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a factory called ' + this.name + '.');
};

util.inherits(FactoryGenerator, yeoman.generators.NamedBase);

FactoryGenerator.prototype.files = function files() {
  this.template('_template.' + this.config.precompilers.js, 'assets/' + this.config.precompilers.js + '/factory/' + this._.slugify(this.name) + '-factory.' + this.config.precompilers.js);
  this.template('_spec.' + this.config.precompilers.js, 'test/unit/factory/' + this._.slugify(this.name) + '-factory-spec.' + this.config.precompilers.js);
};
