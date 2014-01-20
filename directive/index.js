var util = require('util');
var yeoman = require('yeoman-generator');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a directive called ' + this.name + '.');
};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.files = function files() {
  this.template('_template.' + this.config.precompilers.js, 'assets/' + this.config.precompilers.js + '/directive/' + this._.slugify(this.name) + '-directive.' + this.config.precompilers.js);
  this.template('_spec.' + this.config.precompilers.js, 'test/unit/directive/' + this._.slugify(this.name) + '-directive-spec.' + this.config.precompilers.js);
};
