function Belt() {
  this.x = 0
  this.y = 0
}
Belt.prototype.place = function (x, y) {
  this.x = x
  this.y = y
};

exports.Belt = Belt
