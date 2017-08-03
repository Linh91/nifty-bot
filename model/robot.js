const Belt = require('./belt.js')
const Crate = require('./crate.js')

const Robot = function() {
  this.x = 0
  this.y = 0
  this.belt = new Belt()
  this.crate = new Crate()
  this.instructions = []
  this.passedInstruct = []
}

Robot.prototype.position = function (x, y) {
  this.x = x
  this.y = y
};
Robot.prototype.instruct = function(arguments) {
  if (typeof arguments == 'string') {
    arguments = arguments.split('')
    this.instructions = this.instructions.concat(arguments)
  } else {
    this.instructions = this.instructions.concat(arguments)
  }
};

Robot.prototype.newPosition = function() {

};
module.exports = Robot;
