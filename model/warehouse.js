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
    this.robot.position[1] += 1
  } else if (this.instructions[0] == "e") {
    this.robot.position[0] += 1
  } else if (this.instructions[0] == "s") {
    this.robot.position[1] -= 1
  } else if (this.instructions[0] == "w") {
    this.robot.position[0] -= 1
  }
};

// Warehouse.prototype.pickupBags = function () {
//   if (this.robot.position.toString() == this.crate.position.toString()) {
//     this.pickupBags();
//   }
//   this.passedInstruct.push(this.instructions[0])
//   this.instructions.shift()
//   this.output();
// };
module.exports = Warehouse;
