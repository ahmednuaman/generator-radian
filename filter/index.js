var util = require('util');
var yeoman = require('yeoman-generator');

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a filter called ' + this.name + '.');
};

util.inherits(FilterGenerator, yeoman.generators.NamedBase);

FilterGenerator.prototype.files = function files() {
  this.template('_template.' + this.config.precompilers.js, 'assets/' + this.config.precompilers.js + '/filter/' + this._.slugify(this.name) + '-filter.' + this.config.precompilers.js);
  this.template('_spec.' + this.config.precompilers.js, 'test/unit/filter/' + this._.slugify(this.name) + '-filter-spec.' + this.config.precompilers.js);
};
