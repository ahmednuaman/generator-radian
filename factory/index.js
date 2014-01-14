var util = require('util');
var yeoman = require('yeoman-generator');

var FactoryGenerator = module.exports = function FactoryGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a factory called ' + this.name + '.');
};

util.inherits(FactoryGenerator, yeoman.generators.NamedBase);

FactoryGenerator.prototype.files = function files() {
  this.template('_template.coffee', 'assets/coffee/factory/' + this._.slugify(this.name) + '-factory.coffee');
  this.template('_spec.coffee', 'test/unit/factory/' + this._.slugify(this.name) + '-factory-spec.coffee');
};
