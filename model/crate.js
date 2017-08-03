const Crate = function() {
  this.position = []
  this.bags = 0
}
Crate.prototype.description = function (x, y, gummyBears) {
  this.position.push(x, y)
  this.bags = gummyBears
};

module.exports = Crate
