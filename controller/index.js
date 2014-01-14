var util = require('util');
var yeoman = require('yeoman-generator');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a controller called ' + this.name + '.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
  this.template('_template.coffee', 'assets/coffee/controller/' + this._.slugify(this.name) + '-controller.coffee');
  this.template('_spec.coffee', 'test/unit/controller/' + this._.slugify(this.name) + '-controller-spec.coffee');
};
