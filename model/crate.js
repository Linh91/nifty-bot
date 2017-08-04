const Crates = function() {
  this.cratesArray = []
}

Crates.prototype.details = function (x, y, gummyBears) {
  this.cratesArray.push([x, y, gummyBears])
};

module.exports = Crates
