var util = require('util');
var yeoman = require('yeoman-generator');

var CollectionGenerator = module.exports = function CollectionGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a collection called ' + this.name + '.');
};

util.inherits(CollectionGenerator, yeoman.generators.NamedBase);

CollectionGenerator.prototype.files = function files() {
  this.copy('_template.coffee', 'assets/coffee/collection/' + this._.slugify(this.name) + '-collection.coffee');
  this.template('_spec.coffee', 'test/unit/collection/' + this._.slugify(this.name) + '-collection-spec.coffee');
};
