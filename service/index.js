var util = require('util');
var yeoman = require('yeoman-generator');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a service called ' + this.name + '.');
};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
  this.template('_template.' + this.config.precompilers.js, 'assets/' + this.config.precompilers.js + '/service/' + this._.slugify(this.name) + '-service.' + this.config.precompilers.js);
  this.template('_spec.' + this.config.precompilers.js, 'test/unit/service/' + this._.slugify(this.name) + '-service-spec.' + this.config.precompilers.js);
};
