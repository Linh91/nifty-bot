const Warehouse = require("../model/warehouse")
const sinon  = require('sinon');
var assert = require('assert');
var expect = require('chai').expect;

describe('Warehouse', function() {
  var warehouse

  beforeEach(function() {
    warehouse = new Warehouse();
  });

  describe('instructions', function() {
    it('are given for the robot', function() {
      warehouse.commands("ns")
      assert.deepEqual(warehouse.instructions, ["n", "s"]);
    });

    it('can be any number of characters', function() {
      warehouse.commands("nppsse")
      assert.deepEqual(warehouse.instructions, ["n", "p", "p", "s", "s", "e"]);
    });

    it('can be unlimited', function() {
      warehouse.commands("newpsesennppppeeee")
      assert.deepEqual(warehouse.instructions, ["n", "e", "w", "p", "s", "e","s", "e","n", "n", "p", "p", "p", "p", "e","e","e","e",]);
    });

    it('can take directions in an array form', function() {
      warehouse.commands(["s", "n", "e"])
      assert.deepEqual(warehouse.instructions, ["s", "n", "e"]);
    });
  });

  describe('belt', function() {
    it('should be able to give belt a position', function() {
      warehouse.belt.givePosition(2, 5);
      assert.deepEqual(warehouse.belt.position, [ 2, 5 ])
    });

    it('should return x, y cordinates', function() {
      warehouse.belt.givePosition(8, 1);
      assert.deepEqual(warehouse.belt.position, [ 8, 1 ])
    });
  });

  describe('crates', function() {
    it('should be able to give information about crate', function() {
      warehouse.crate.details(2, 5, 2);
      assert.deepEqual(warehouse.crate.cratesArray, [ [ 2, 5, 2 ] ])
    });

    it('will return details about crates', function() {
      warehouse.crate.details(4, 1, 6);
      assert.deepEqual(warehouse.crate.cratesArray, [ [ 4, 1, 6 ] ])
    });
  });

  describe('Moving robot', function() {
    it('will increase y when north', function() {
      warehouse.robot.givePosition(1,1);
      warehouse.commands("n");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 1, 2 ]);
    });

    it('y cordinates will increase when N', function() {
      warehouse.robot.givePosition(4,2);
      warehouse.commands("n");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 4, 3 ]);
    });

    it('will increase x when east', function() {
      warehouse.robot.givePosition(1,1);
      warehouse.commands("e");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 2, 1 ]);
    });

    it('x cordinates will increase when E', function() {
      warehouse.robot.givePosition(4,2);
      warehouse.commands("e");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('will decrease y when south', function() {
      warehouse.robot.givePosition(5,3);
      warehouse.commands("s");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('y cordinates will decrease when S', function() {
      warehouse.robot.givePosition(8,2);
      warehouse.commands("s");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 8, 1 ]);
    });

    it('will decrease x when west', function() {
      warehouse.robot.givePosition(9,4);
      warehouse.commands("w");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 8, 4 ]);
    });

    it('x cordinates will decrease when W', function() {
      warehouse.robot.givePosition(0,2);
      warehouse.commands("w");
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ -1, 2 ]);
    });
  });

  describe('Execution', function() {
    it('carries out instructions and once executes removes that instruction', function() {
      warehouse.robot.givePosition(0,2);
      warehouse.commands("wppdd");
      assert.deepEqual(warehouse.instructions, [ 'w', 'p', 'p', 'd', 'd' ]);
    });
    it('carries out instructions and once executes removes that instruction', function() {
      warehouse.robot.givePosition(0,2);
      warehouse.commands("wnpdd");
      assert.deepEqual(warehouse.instructions, [ 'w', 'n', 'p', 'd', 'd' ]);
    });
  });

  describe('Correct output', function() {
    it('returns the correct output when completes execution', function() {
      warehouse.robot.givePosition(0,0)
      warehouse.belt.givePosition(0,2)
      warehouse.crate.details(0,1,10)
      warehouse.crate.details(-1,-2,5)
      warehouse.commands("npppnd")
      warehouse.run();;
      assert.deepEqual(warehouse.robot.position, [ 0, 2 ]);
    });

    it('does not accept anything that isnt NESWDP', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.commands("zb");
      warehouse.run();
      assert(spy.calledWith(0))
      spy.restore();
    });

    it('returns error when wrong commands', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.commands("bc");
      warehouse.run();
      assert(spy.calledWith(0))
      spy.restore();
    });

    it('returns output when last command is run', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.robot.givePosition(0,2);
      warehouse.belt.givePosition(0,2);
      warehouse.crate.details(0,2,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("ppd");
      warehouse.run();
      assert(spy.calledWith(2))
      spy.restore();
    });

    it('returns output when last command is run', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.belt.givePosition(0,2)
      warehouse.robot.givePosition(0,0)
      warehouse.crate.details(0,1,10)
      warehouse.crate.details(-1,-2,5)
      warehouse.commands("npppnd")
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
      warehouse.commands("nppnd");
      warehouse.run();
      assert.deepEqual(warehouse.bags, 2);
    });

    it('does not output bags if it has not been dropped', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.robot.givePosition(0,2);
      warehouse.belt.givePosition(0,2);
      warehouse.crate.details(0,2,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("pp");
      warehouse.run();
      warehouse.run();
      assert(spy.calledWith(0));
      spy.restore();
    });
  });

  describe('Broken', function() {
    it('will return broken if given a p but not in correct position', function() {
      let spy = sinon.spy(console, 'log');
      warehouse.robot.givePosition(3,2);
      warehouse.belt.givePosition(5,2);
      warehouse.crate.details(0,2,10);
      warehouse.crate.details(-1,-2,5);
      warehouse.commands("pp");
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
      warehouse.commands("dp");
      warehouse.run();
      assert(spy.calledWith(0));
      spy.restore();
    });
  });
});
