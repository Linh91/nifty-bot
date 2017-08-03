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

Warehouse.prototype.output = function () {
  if (this.instructions[0] == "n") {
    this.robot.y += 1
    if (this.robot.x && this.robot.y == this.crate.x && this.crate.y) {
      console.log("this works")
    }
  }
};
module.exports = Warehouse;
