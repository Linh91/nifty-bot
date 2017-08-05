const Warehouse = require("../model/warehouse")
const sinon  = require('sinon');
var assert = require('assert');
var expect = require('chai').expect;

describe('Warehouse', function() {
  var warehouse;

  beforeEach(function() {
    warehouse = new Warehouse();
  });

  describe('instructions', function() {
    it('are given for the robot', function() {
      warehouse.commands("NS");
      assert.deepEqual(warehouse.instructions, ["N", "S"]);
    });

    it('can be any number of characters', function() {
      warehouse.commands("NPPSSE");
      assert.deepEqual(warehouse.instructions, ["N", "P", "P", "S", "S", "E"]);
    });

    it('can be unlimited', function() {
      warehouse.commands("NEWPS");
      assert.deepEqual(warehouse.instructions, [ 'N', 'E', 'W', 'P', 'S' ]);
    });

    it('can take directions in an array form', function() {
      warehouse.commands(["S", "N", "E"]);
      assert.deepEqual(warehouse.instructions, ["S", "N", "E"]);
    });
  });

  describe('belt', function() {
    it('should be able to give belt a position', function() {
      warehouse.belt.givePosition(2, 5);
      assert.deepEqual(warehouse.belt.position, [ 2, 5 ]);
    });

    it('should return x, y cordinates', function() {
      warehouse.belt.givePosition(8, 1);
      assert.deepEqual(warehouse.belt.position, [ 8, 1 ]);
    });
  });

  describe('crates', function() {
    it('should be able to give information about crate', function() {
      warehouse.crate.details(2, 5, 2);
      assert.deepEqual(warehouse.crate.cratesArray, [ [ 2, 5, 2 ] ]);
    });

    it('will return details about crates', function() {
      warehouse.crate.details(4, 1, 6);
      assert.deepEqual(warehouse.crate.cratesArray, [ [ 4, 1, 6 ] ]);
    });
  });

  describe('Execution', function() {
    it('carries out instructions and once executes removes that instruction', function() {
      warehouse.robot.givePosition(0,2);
      warehouse.commands("WPPDD");
      assert.deepEqual(warehouse.instructions, [ "W", "P", "P", "D", "D" ]);
    });

    it('carries out instructions and once executes removes that instruction', function() {
      warehouse.robot.givePosition(0,2);
      warehouse.commands("WNPDD");
      assert.deepEqual(warehouse.instructions, [ "W", "N", "P", "D", "D" ]);
    });
  });

  describe('Moving robot', function() {
    it('will increase y when north', function() {
      warehouse.robot.givePosition(1,1);
      warehouse.commands("N");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 1, 2 ]);
    });

    it('y cordinates will increase when N', function() {
      warehouse.robot.givePosition(4,2);
      warehouse.commands("N");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 4, 3 ]);
    });

    it('will increase x when east', function() {
      warehouse.robot.givePosition(1,1);
      warehouse.commands("E");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 2, 1 ]);
    });

    it('x cordinates will increase when E', function() {
      warehouse.robot.givePosition(4,2);
      warehouse.commands("E");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('will decrease y when south', function() {
      warehouse.robot.givePosition(5,3);
      warehouse.commands("S");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('y cordinates will decrease when S', function() {
      warehouse.robot.givePosition(8,2);
      warehouse.commands("S");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 8, 1 ]);
    });

    it('will decrease x when west', function() {
      warehouse.robot.givePosition(9,4);
      warehouse.commands("W");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 8, 4 ]);
    });

    it('x cordinates will decrease when W', function() {
      warehouse.robot.givePosition(0,2);
      warehouse.commands("W");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ -1, 2 ]);
    });
  });

  describe('Correct output', function() {
    it('returns the correct output when completes execution', function() {
      warehouse.robot.givePosition(0,0);
      warehouse.belt.givePosition(0,2);
      warehouse.crate.details(0,1,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("NPPPND");
      warehouse.run();
      assert.deepEqual(warehouse.robot.position, [ 0, 2 ]);
    });

    it('does not accept anything that isnt NESWDP', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.commands("ZB");
      warehouse.run();
      assert(spy.calledWith(0));
      spy.restore();
    });

    it('returns error when wrong commands', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.commands("BC");
      warehouse.run();
      assert(spy.calledWith(0));
      spy.restore();
    });

    it('returns output when last command is run', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.robot.givePosition(0,2);
      warehouse.belt.givePosition(0,2);
      warehouse.crate.details(0,2,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("PPD");
      warehouse.run();
      assert(spy.calledWith(2));
      spy.restore();
    });

    it('returns output when last command is run', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.belt.givePosition(0,2);
      warehouse.robot.givePosition(0,0);
      warehouse.crate.details(0,1,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("NPPPND");
      warehouse.run();
      assert(spy.calledWith(3));
      spy.restore();
    });
  });

  describe('Multiple pickups', function() {
    it('can pick up more than one bag', function() {
      warehouse.robot.givePosition(0,0);
      warehouse.belt.givePosition(0,2);
      warehouse.crate.details(0,1,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("NPPND");
      warehouse.run();
      assert.deepEqual(warehouse.droppedBags, 2);
    });

    it('does not output bags if it has not been dropped', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.robot.givePosition(0,2);
      warehouse.belt.givePosition(0,2);
      warehouse.crate.details(0,2,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("PP");
      warehouse.run();
      warehouse.run();
      assert(spy.calledWith(0));
      spy.restore();
    });
  });

  describe('Broken', function() {
    it('will return nothing if given a p but not in correct position', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.robot.givePosition(3,2);
      warehouse.belt.givePosition(5,2);
      warehouse.crate.details(0,2,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("PP");
      warehouse.run();
      assert(spy.calledWith(0));
      spy.restore();
    });

    it('will return broken if given a d but not in correct position', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.robot.givePosition(3,2);
      warehouse.belt.givePosition(5,2);
      warehouse.crate.details(0,2,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("DP");
      warehouse.run();
      assert(spy.calledWith(0));
      spy.restore();
    });
  });
});
