'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a filter called ' + this.name + '.');
};

util.inherits(FilterGenerator, yeoman.generators.NamedBase);

FilterGenerator.prototype.files = function files() {
  this.template('_template.coffee', 'assets/js/filter/' + this._.slugify(this.name) + '-filter.coffee');
  this.template('_spec.coffee', 'test/unit/filter/' + this._.slugify(this.name) + '-filter-spec.coffee');
};
