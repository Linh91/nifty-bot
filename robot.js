function Robot() {
  this.x = 0
  this.y = 0
}

Robot.prototype.position = function (x, y) {
  this.x = x
  this.y = y
};
Robot.prototype.instruct = function(arguments) {
  return(arguments.split(''))
};

exports.Robot = Robot
