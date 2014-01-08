'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a service called ' + this.name + '.');
};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
  this.template('_template.coffee', 'assets/coffee/service/' + this._.slugify(this.name) + '-service.coffee');
  this.template('_spec.coffee', 'test/unit/service/' + this._.slugify(this.name) + '-service-spec.coffee');
};
