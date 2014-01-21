var _ = require('lodash');

var Color = function(colors) {
  this.colors = colors;
  this.currentIndex = 0;
};

Color.prototype.next = function() {
  this.currentIndex = (this.currentIndex + 1) % this.colors.length;
  return this.current();
};

Color.prototype.current = function() {
  return this.colors[this.currentIndex];
};

Color.prototype.set = function(id) {
  var index = _.findIndex(this.colors, { 'id': id });
  this.currentIndex = index;
  return this.current();
};

module.exports = Color;
