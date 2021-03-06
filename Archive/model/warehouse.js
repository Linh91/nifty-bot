const Belt = require('./belt.js');
const Crate = require('./crate.js');
const Robot = require('./robot.js');

const Warehouse = function() {
  this.belt = new Belt();
  this.crate = new Crate();
  this.robot = new Robot();
  this.instructions = [];
  this.bags = 0;
  this.droppedBags = 0;
  this.cratePosition = [];
}

Warehouse.prototype.commands = function(arguments) {
  if (typeof arguments == 'string') arguments = arguments.split('');
  return this.instructions = this.instructions.concat(arguments);
};

Warehouse.prototype.run = function () {
  if (this.instructions[0] == "N" || this.instructions[0] == "S") this.yAxis();
  else if (this.instructions[0] == "S" || this.instructions[0] == "W") this.xAxis();
  else if (this.instructions[0] == "D" || this.instructions[0] == "P") this.pickDropFunction();
  else this.broken();
};

Warehouse.prototype.yAxis = function () {
  (this.instructions[0] == "N") ? this.robot.position[1] += 1 : this.robot.position[1] -= 1;
  this.commandOutput();
};

Warehouse.prototype.xAxis = function () {
  (this.instructions[0] == "S") ? this.robot.position[0] += 1 : this.robot.position[0] -= 1;
  this.commandOutput();
};

Warehouse.prototype.pickDropFunction = function () {
  if (this.instructions[0] == "P") {
    this.cratePosition.push(this.crate.cratesArray[0][0]);
    this.cratePosition.push(this.crate.cratesArray[0][1]);
    if (this.instructions[0] == "P" && this.robot.position.toString() == this.cratePosition) this.pickup();
    else this.broken();
  } else if (this.instructions[0] == "D" && this.robot.position.toString() == this.belt.position.toString()) {
    this.droppedBags = this.bags;
    this.commandOutput();
  } else {
    this.broken();
  };
};

Warehouse.prototype.multiplePickups = function () {
  this.crate.cratesArray[0][2] -= 1
  if (this.crate.cratesArray[0][2] > -1) this.bags += 1;
  this.cratePosition = [];
  this.commandOutput();
};

Warehouse.prototype.pickup = function () {
  if (this.instructions[1] == "P") this.multiplePickups();
  else {
    this.multiplePickups();
    this.crate.cratesArray.splice(0,1);
  };
};

Warehouse.prototype.commandOutput = function () {
  this.instructions.shift();
  if (this.instructions.length == 0) return this.status();
  this.run();
};

Warehouse.prototype.status = function () {
  console.log(this.droppedBags);
  console.log(this.robot.position.toString() + " OK");
};

Warehouse.prototype.broken = function () {
  console.log(this.droppedBags);
  console.log(this.robot.position.toString() + " BROKEN");
};

module.exports = Warehouse;
