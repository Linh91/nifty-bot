const Belt = require('./belt.js')
const Crate = require('./crate.js')

const Robot = function() {
  this.x = 0
  this.y = 0
  this.belt = new Belt()
  this.crate = new Crate()
}

Robot.prototype.position = function (x, y) {
  this.x = x
  this.y = y
};
Robot.prototype.instruct = function(arguments) {
  return(arguments.split(''))
};

module.exports = Robot;
