const Belt = require('./belt.js')
const Crate = require('./crate.js')
const Robot = require('./robot.js')

const Warehouse = function() {
  this.belt = new Belt()
  this.crates = new Crate()
  this.robot = new Robot()
  this.instructions = []
  this.bags = 0
  this.dropBags = 0
}

Warehouse.prototype.commands = function(arguments) {
  if (typeof arguments == 'string') arguments = arguments.split('');
  return this.instructions = this.instructions.concat(arguments)
};

Warehouse.prototype.output = function () {
  if (this.instructions[0] == "n" || this.instructions[0] == "s") {
    this.yAxis()
  } else if (this.instructions[0] == "e" || this.instructions[0] == "w") {
    this.xAxis();
  } else if (this.instructions[0] == "d" || this.instructions[0] == "p") {
    return this.bagDuty()
  } else {
    this.print()
  }
};

Warehouse.prototype.yAxis = function () {
  (this.instructions[0] == "n") ? this.robot.position[1] += 1 : this.robot.position[1] -= 1
  this.instructions.shift()
};

Warehouse.prototype.xAxis = function () {
  (this.instructions[0] == "e") ? this.robot.position[0] += 1 : this.robot.position[0] -= 1
  this.instructions.shift()
};

Warehouse.prototype.bagDuty = function () {
  if (this.instructions[0] == "p" && this.robot.position.toString() == this.crate.position.toString()) {
    if (this.crate.bags > 0) this.bags += 1;
  } else if (this.instructions[0] == "d" && this.robot.position.toString() == this.belt.position.toString()) {
    this.dropBags = this.bags;
  } else {
    this.broken()
  }
  this.instructions.shift()
};

Warehouse.prototype.print = function () {
  console.log(this.bags)
  console.log(this.robot.position.toString() + " OK")
};

Warehouse.prototype.broken = function () {
  console.log(this.bags)
  console.log(this.robot.position.toString() + " BROKEN")
};

module.exports = Warehouse;
