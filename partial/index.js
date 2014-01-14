var util = require('util');
var yeoman = require('yeoman-generator');

var PartialGenerator = module.exports = function PartialGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.config = JSON.parse(this.readFileAsString('.radianrc'));

  console.log('Creating a ' + this.config.precompilers.html + ' and ' + this.config.precompilers.css + ' partial called ' + this.name + '.');
};

util.inherits(PartialGenerator, yeoman.generators.NamedBase);

PartialGenerator.prototype.files = function files() {
  var partialsFilePath = 'assets/' + this.config.precompilers.css + '/_partials.' + this.config.precompilers.css,
      partialsFileContent = this.readFileAsString(partialsFilePath);

  this.template('_partial.' + this.config.precompilers.html, 'assets/partial/' + this._.slugify(this.name) + '-partial.' + this.config.precompilers.html);
  this.template('_partial.' + this.config.precompilers.css, 'assets/' + this.config.precompilers.css + '/partial/_' + this._.slugify(this.name) + '.' + this.config.precompilers.css);

  this.writeFileFromString(partialsFileContent + "\n@import 'partial/" + this._.slugify(this.name) + "'", partialsFilePath);
};
