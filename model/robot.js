const Warehouse = require('./warehouse.js');

const Robot = function() {
  this.position = [];
}

Robot.prototype.givePosition = function (x, y) {
  this.position.push(x, y);
};

Robot.prototype.north = function () {
  this.position[1] += 1
};

Robot.prototype.east = function () {
  this.position[0] += 1;
};

// Warehouse.prototype.yAxis = function () {
//   (this.instructions[0] == "N") ? this.robot.position[1] += 1 : this.robot.position[1] -= 1;
//   this.commandOutput();
// };

module.exports = Robot;
