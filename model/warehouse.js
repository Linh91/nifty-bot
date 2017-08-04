const Belt = require('./belt.js')
const Crate = require('./crate.js')
const Robot = require('./robot.js')

const Warehouse = function() {
  this.belt = new Belt()
  this.crate = new Crate()
  this.robot = new Robot()
  this.instructions = []
  this.bags = 0
  this.droppedBags = 0
  this.cratePos = []
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
    this.broken()
  }
};

Warehouse.prototype.yAxis = function () {
  (this.instructions[0] == "n") ? this.robot.position[1] += 1 : this.robot.position[1] -= 1
  this.commandOutput()
};

Warehouse.prototype.xAxis = function () {
  (this.instructions[0] == "e") ? this.robot.position[0] += 1 : this.robot.position[0] -= 1
  this.commandOutput()
};

Warehouse.prototype.bagDuty = function () {
  if (this.instructions[0] == "p") {
    this.cratePos.push(this.crate.cratesArray[0][0])
    this.cratePos.push(this.crate.cratesArray[0][1])
    if (this.instructions[0] == "p" && this.robot.position.toString() == this.cratePos) {
      this.pickup();
    }
  } else if (this.instructions[0] == "d" && this.robot.position.toString() == this.belt.position.toString()) {
    this.droppedBags = this.bags;
    this.commandOutput()
  } else {
    this.broken()
  }
}

Warehouse.prototype.multiPickups = function () {
  if (this.crate.cratesArray[0][2] > 0) this.bags += 1
  this.commandOutput()
};

Warehouse.prototype.pickup = function () {
  if (this.instructions[1] == "p") {
    this.multiPickups()
    this.cratePos = []
  }
  else {
    this.multiPickups()
    this.cratePos = []
    this.crate.cratesArray.splice(0,1)
  }
};

Warehouse.prototype.commandOutput = function () {
  this.instructions.shift()
  if (this.instructions.length == 0) return this.broken()
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
