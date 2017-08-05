const System = require("../model/system")
const sinon  = require('sinon');
var assert = require('assert');
var expect = require('chai').expect;

describe('System', function() {
  var system;

  beforeEach(function() {
    system = new System();
  });

  describe('instructions', function() {
    it('are given for the robot', function() {
      system.commands("NS");
      assert.deepEqual(system.instructions, ["N", "S"]);
    });

    it('can be any number of characters', function() {
      system.commands("NPPSSE");
      assert.deepEqual(system.instructions, ["N", "P", "P", "S", "S", "E"]);
    });

    it('can be unlimited', function() {
      system.commands("NEWPS");
      assert.deepEqual(system.instructions, [ 'N', 'E', 'W', 'P', 'S' ]);
    });

    it('can take directions in an array form', function() {
      system.commands(["S", "N", "E"]);
      assert.deepEqual(system.instructions, ["S", "N", "E"]);
    });
  });

  describe('belt', function() {
    it('should be able to give belt a position', function() {
      system.belt.givePosition(2, 5);
      assert.deepEqual(system.belt.position, [ 2, 5 ]);
    });

    it('should return x, y cordinates', function() {
      system.belt.givePosition(8, 1);
      assert.deepEqual(system.belt.position, [ 8, 1 ]);
    });
  });

  describe('crates', function() {
    it('should be able to give information about crate', function() {
      system.crate.details(2, 5, 2);
      assert.deepEqual(system.crate.cratesArray, [ [ 2, 5, 2 ] ]);
    });

    it('will return details about crates', function() {
      system.crate.details(4, 1, 6);
      assert.deepEqual(system.crate.cratesArray, [ [ 4, 1, 6 ] ]);
    });
  });

  describe('Execution', function() {
    it('carries out instructions and once executes removes that instruction', function() {
      system.robot.givePosition(0,2);
      system.commands("WPPDD");
      assert.deepEqual(system.instructions, [ "W", "P", "P", "D", "D" ]);
    });

    it('carries out instructions and once executes removes that instruction', function() {
      system.robot.givePosition(0,2);
      system.commands("WNPDD");
      assert.deepEqual(system.instructions, [ "W", "N", "P", "D", "D" ]);
    });
  });

  describe('Moving robot', function() {
    it('will increase y when north', function() {
      system.robot.givePosition(1,1);
      system.commands("N");
      system.run();
      assert.deepEqual(system.robot.position, [ 1, 2 ]);
    });

    it('y cordinates will increase when N', function() {
      system.robot.givePosition(4,2);
      system.commands("N");
      system.run();
      assert.deepEqual(system.robot.position, [ 4, 3 ]);
    });

    it('will increase x when east', function() {
      system.robot.givePosition(1,1);
      system.commands("E");
      system.run();
      assert.deepEqual(system.robot.position, [ 2, 1 ]);
    });

    it('x cordinates will increase when E', function() {
      system.robot.givePosition(4,2);
      system.commands("E");
      system.run();
      assert.deepEqual(system.robot.position, [ 5, 2 ]);
    });

    it('will decrease y when south', function() {
      system.robot.givePosition(5,3);
      system.commands("S");
      system.run();
      assert.deepEqual(system.robot.position, [ 5, 2 ]);
    });

    it('y cordinates will decrease when S', function() {
      system.robot.givePosition(8,2);
      system.commands("S");
      system.run();
      assert.deepEqual(system.robot.position, [ 8, 1 ]);
    });

    it('will decrease x when west', function() {
      system.robot.givePosition(9,4);
      system.commands("W");
      system.run();
      assert.deepEqual(system.robot.position, [ 8, 4 ]);
    });

    it('x cordinates will decrease when W', function() {
      system.robot.givePosition(0,2);
      system.commands("W");
      system.run();
      assert.deepEqual(system.robot.position, [ -1, 2 ]);
    });
  });

  describe('Correct output', function() {
    it('returns the correct output when completes execution', function() {
      system.robot.givePosition(0,0);
      system.belt.givePosition(0,2);
      system.crate.details(0,1,10);
      system.crate.details(-1,-2,5);
      system.commands("NPPPND");
      system.run();
      assert.deepEqual(system.robot.position, [ 0, 2 ]);
    });

    it('does not accept anything that isnt NESWDP', function() {
      let spy = sinon.spy(console, 'log');
      system.commands("ZB");
      system.run();
      assert(spy.calledWith(0));
      spy.restore();
    });

    it('returns error when wrong commands', function() {
      let spy = sinon.spy(console, 'log');
      system.commands("BC");
      system.run();
      assert(spy.calledWith(0));
      spy.restore();
    });

    it('returns output when last command is run', function() {
      let spy = sinon.spy(console, 'log');
      system.robot.givePosition(0,2);
      system.belt.givePosition(0,2);
      system.crate.details(0,2,10);
      system.crate.details(-1,-2,5);
      system.commands("PPD");
      system.run();
      assert(spy.calledWith(2));
      spy.restore();
    });

    it('returns output when last command is run', function() {
      let spy = sinon.spy(console, 'log');
      system.belt.givePosition(0,2);
      system.robot.givePosition(0,0);
      system.crate.details(0,1,10);
      system.crate.details(-1,-2,5);
      system.commands("NPPPND");
      system.run();
      assert(spy.calledWith(3));
      spy.restore();
    });
  });

  describe('Multiple pickups', function() {
    it('can pick up more than one bag', function() {
      system.robot.givePosition(0,0);
      system.belt.givePosition(0,2);
      system.crate.details(0,1,10);
      system.crate.details(-1,-2,5);
      system.commands("NPPND");
      system.run();
      assert.deepEqual(system.droppedBags, 2);
    });

    it('does not output bags if it has not been dropped', function() {
      let spy = sinon.spy(console, 'log');
      system.robot.givePosition(0,2);
      system.belt.givePosition(0,2);
      system.crate.details(0,2,10);
      system.crate.details(-1,-2,5);
      system.commands("PP");
      system.run();
      system.run();
      assert(spy.calledWith(0));
      spy.restore();
    });
  });

  describe('Broken', function() {
    it('will return nothing if given a p but not in correct position', function() {
      let spy = sinon.spy(console, 'log');
      system.robot.givePosition(3,2);
      system.belt.givePosition(5,2);
      system.crate.details(0,2,10);
      system.crate.details(-1,-2,5);
      system.commands("PP");
      system.run();
      assert(spy.calledWith(0));
      spy.restore();
    });

    it('will return broken if given a d but not in correct position', function() {
      let spy = sinon.spy(console, 'log');
      system.robot.givePosition(3,2);
      system.belt.givePosition(5,2);
      system.crate.details(0,2,10);
      system.crate.details(-1,-2,5);
      system.commands("DP");
      system.run();
      assert(spy.calledWith(0));
      spy.restore();
    });
  });
});
