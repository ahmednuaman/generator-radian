var util = require('util');
var yeoman = require('yeoman-generator');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a directive called ' + this.name + '.');
};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.files = function files() {
  this.template('_template.coffee', 'assets/coffee/directive/' + this._.slugify(this.name) + '-directive.coffee');
  this.template('_spec.coffee', 'test/unit/directive/' + this._.slugify(this.name) + '-directive-spec.coffee');
};
