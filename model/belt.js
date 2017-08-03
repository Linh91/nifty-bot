const Belt = function() {
  this.position = []
}
Belt.prototype.givePosition = function (x, y) {
  this.position.push(x, y)
};

module.exports = Belt
