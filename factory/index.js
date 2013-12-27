'use strict';
var _ = require('_');
var util = require('util');
var yeoman = require('yeoman-generator');

var FactoryGenerator = module.exports = function FactoryGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the factory subgenerator with the argument ' + this.name + '.');
};

util.inherits(FactoryGenerator, yeoman.generators.NamedBase);

FactoryGenerator.prototype.files = function files() {
  this.template('template.coffee', 'assets/js/factory/' + _.slugify(this.name) + '-factory.coffee');
};
