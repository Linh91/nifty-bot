function Robot() {
  this.x = 0
  this.y = 0
}
Robot.prototype.place = function (x, y) {
  this.x = x
  this.y = y
};

exports.Robot = Robot
