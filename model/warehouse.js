const Belt = require('./belt.js')
const Crate = require('./crate.js')
const Robot = require('./robot.js')

const Warehouse = function() {
  this.belt = new Belt()
  this.crate = new Crate()
  this.robot = new Robot()
  this.instructions = []
  this.bags = 0
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
    this.north()
  } else if (this.instructions[0] == "e") {
    this.east();
  } else if (this.instructions[0] == "s") {
    this.south()
  } else if (this.instructions[0] == "w") {
    this.west();
  } else if (this.instructions[0] == "d") {
     return this.drop()
  } else if (this.instructions[0] == "p") {
     this.pickupBags()
  }
};

Warehouse.prototype.north = function () {
  this.robot.position[1] += 1
  this.instructions.shift()
  if (this.robot.position.toString() == this.crate.position.toString()) {
    this.pickupBags()
  }
};

Warehouse.prototype.east = function () {
  this.robot.position[0] += 1
  this.instructions.shift()
  if (this.robot.position.toString() == this.crate.position.toString()) {
    this.pickupBags()
  }
};

Warehouse.prototype.south = function () {
  this.robot.position[1] -= 1
  this.instructions.shift()
  if (this.robot.position.toString() == this.crate.position.toString()) {
    this.pickupBags()
  }
};

Warehouse.prototype.west = function () {
  this.robot.position[0] -= 1
  this.instructions.shift()
  if (this.robot.position.toString() == this.crate.position.toString()) {
    this.pickupBags()
  }
};

Warehouse.prototype.pickupBags = function () {
    this.bags += 1
    this.instructions.shift()
}

Warehouse.prototype.drop = function () {
 if (this.robot.position.toString() == this.belt.position.toString()) {
   return this.print()
 } else {
   return 0
 }
};

Warehouse.prototype.print = function () {
  console.log(this.bags)
  console.log(this.robot.position.toString() + " OK")
};

Warehouse.prototype.broken = function () {
  console.log(this.robot.position.toString() + " BROKEN")
};

module.exports = Warehouse;
