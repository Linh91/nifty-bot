const Belt = require('./belt.js');
const Crate = require('./crate.js');
const Robot = require('./robot.js');

const System = function() {
  this.belt = new Belt();
  this.crate = new Crate();
  this.robot = new Robot();
  this.instructions = [];
  this.droppedBags = 0;
  this.cratePosition = [];
}

System.prototype.commands = function(arguments) {
  if (typeof arguments == 'string') arguments = arguments.split('');
  return this.instructions = this.instructions.concat(arguments);
};

System.prototype.run = function () {
  if (this.instructions[0] == "N") {
    this.robot.north();
    this.commandOutput(); 
  } else if (this.instructions[0] == "E") {
    this.robot.east();
    this.commandOutput();
  } else if (this.instructions[0] == "S") {
    this.robot.south();
    this.commandOutput();
  } else if (this.instructions[0] == "W") {
    this.robot.west();
    this.commandOutput();
  } else if (this.instructions[0] == "D" || this.instructions[0] == "P") {
    this.pickDropFunction();
  } else if (this.instructions.length > 0) {
     this.broken();
  };
};

System.prototype.pickDropFunction = function () {
  if (this.instructions[0] == "P") {
    this.currentCrate();
    if (this.instructions[0] == "P" && this.robot.position.toString() == this.cratePosition) this.pickup();
    else this.broken();
  } else if (this.instructions[0] == "D" && this.robot.position.toString() == this.belt.position.toString()) {
    this.bagsDropped();
  } else {
    this.broken();
  };
};

System.prototype.currentCrate = function () {
  this.cratePosition.push(this.crate.cratesArray[0][0]);
  this.cratePosition.push(this.crate.cratesArray[0][1]);
};

System.prototype.bagsDropped = function () {
  this.droppedBags = this.robot.pickedUpBags;
  this.robot.pickedUpBags = 0;
  this.commandOutput();
};

System.prototype.multiplePickups = function () {
  this.crate.cratesArray[0][2] -= 1;
  if (this.crate.cratesArray[0][2] > -1) this.robot.pickedUpBags += 1;
  this.cratePosition = [];
  this.commandOutput();
};

System.prototype.pickup = function () {
  if (this.instructions[1] == "P") this.multiplePickups();
  else {
    this.multiplePickups();
    this.cratePosition = [];
    this.crate.cratesArray.splice(0,1);
  };
};

System.prototype.commandOutput = function () {
  this.instructions.shift();
  if (this.instructions.length == 0) this.status();
  this.run();
};

System.prototype.status = function () {
  console.log(this.droppedBags);
  console.log(this.robot.position.toString() + " OK");
};

System.prototype.broken = function () {
  console.log(this.droppedBags);
  console.log(this.robot.position.toString() + " BROKEN");
};

module.exports = System;
