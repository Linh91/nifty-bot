const Belt = function() {
  this.x = 0
  this.y = 0
}
Belt.prototype.position = function (x, y) {
  this.x = x
  this.y = y
};

module.exports = Belt
