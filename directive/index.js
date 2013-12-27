'use strict';
var _ = require('_');
var util = require('util');
var yeoman = require('yeoman-generator');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the directive subgenerator with the argument ' + this.name + '.');
};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.files = function files() {
  this.template('template.coffee', 'assets/js/directive/' + _.slugify(this.name) + '-directive.coffee');
};
