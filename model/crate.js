const Crate = function() {
  this.x = 0
  this.y = 0
  this.bags = 0
}
Crate.prototype.description = function (x, y, gummyBears) {
  this.x = x
  this.y = y
  this.bags = gummyBears
};

module.exports = Crate
