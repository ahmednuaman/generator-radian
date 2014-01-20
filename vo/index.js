var util = require('util');
var yeoman = require('yeoman-generator');

var VOGenerator = module.exports = function VOGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a vo called ' + this.name + '.');
};

util.inherits(VOGenerator, yeoman.generators.NamedBase);

VOGenerator.prototype.files = function files() {
  this.copy('_template.' + this.config.precompilers.js, 'assets/' + this.config.precompilers.js + '/vo/' + this._.slugify(this.name) + '-vo.' + this.config.precompilers.js);
  this.template('_spec.' + this.config.precompilers.js, 'test/unit/vo/' + this._.slugify(this.name) + '-vo-spec.' + this.config.precompilers.js);
};
