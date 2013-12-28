'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PartialGenerator = module.exports = function PartialGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Creating a jade and sass partial called ' + this.name + '.');
};

util.inherits(PartialGenerator, yeoman.generators.NamedBase);

PartialGenerator.prototype.files = function files() {
  var partialsFile = this.readFileAsString('assets/css/_partials.sass');

  this.template('_partial.jade', 'assets/partial/' + this._.slugify(this.name) + '-partial.jade');
  this.template('_partial.sass', 'assets/css/partial/_' + this._.slugify(this.name) + '.sass');

  this.write(partialsFile, "\n@import 'partial/" + this._.slugify(this.name) + "'");
};
