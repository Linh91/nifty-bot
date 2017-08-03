const Crate = function() {
  this.des = []
}
Crate.prototype.description = function (x, y, gummyBears) {
  this.des.push([x, y, gummyBears])
};

module.exports = Crate
