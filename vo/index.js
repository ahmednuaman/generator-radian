'use strict';
var _ = require('_');
var util = require('util');
var yeoman = require('yeoman-generator');

var VOGenerator = module.exports = function VOGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the vo subgenerator with the argument ' + this.name + '.');
};

util.inherits(VOGenerator, yeoman.generators.NamedBase);

VOGenerator.prototype.files = function files() {
  this.copy('template.coffee', 'assets/js/vo/' + _.slugify(this.name) + '-vo.coffee');
};
