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

Robot.prototype.south = function () {
  this.position[1] -= 1;
};

Robot.prototype.west = function () {
  this.position[0] -= 1;
};

module.exports = Robot;
