function Crate() {
  this.des = []
}
Crate.prototype.description = function (x, y, gummyBears) {
  this.des.push([x, y, gummyBears])
};

exports.Crate = Crate
