const Belt = require('./belt.js')
const Crate = require('./crate.js')
const Robot = require('./robot.js')

const Warehouse = function() {
  this.belt = new Belt()
  this.crate = new Crate()
  this.robot = new Robot()
  this.instructions = []
  this.passedInstruct = []
}

Warehouse.prototype.instruct = function(arguments) {
  if (typeof arguments == 'string') {
    arguments = arguments.split('')
    this.instructions = this.instructions.concat(arguments)
  } else {
    this.instructions = this.instructions.concat(arguments)
  }
};
module.exports = Warehouse;
