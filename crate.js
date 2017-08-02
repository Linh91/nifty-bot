function Crate() {
  this.x = 0
  this.y = 0
}
Crate.prototype.position = function (x, y) {
  this.x = x
  this.y = y
};

exports.Crate = Crate
