'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var VOGenerator = module.exports = function VOGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a vo called ' + this.name + '.');
};

util.inherits(VOGenerator, yeoman.generators.NamedBase);

VOGenerator.prototype.files = function files() {
  this.copy('_template.coffee', 'assets/js/vo/' + this._.slugify(this.name) + '-vo.coffee');
  this.template('_spec.coffee', 'test/unit/vo/' + this._.slugify(this.name) + '-vo-spec.coffee');
};
