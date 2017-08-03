const Robot = function() {
  this.position = []
}

Robot.prototype.givePosition = function (x, y) {
  this.position.push(x, y)
};

module.exports = Robot;
