var util = require('util');
var yeoman = require('yeoman-generator');

var CollectionGenerator = module.exports = function CollectionGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a collection called ' + this.name + '.');
};

util.inherits(CollectionGenerator, yeoman.generators.NamedBase);

CollectionGenerator.prototype.files = function files() {
  this.copy('_template.' + this.config.precompilers.js, 'assets/' + this.config.precompilers.js + '/collection/' + this._.slugify(this.name) + '-collection.' + this.config.precompilers.js);
  this.template('_spec.' + this.config.precompilers.js, 'test/unit/collection/' + this._.slugify(this.name) + '-collection-spec.' + this.config.precompilers.js);
};
