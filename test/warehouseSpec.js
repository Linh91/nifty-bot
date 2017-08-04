const Warehouse = require("../model/warehouse")
const sinon  = require('sinon');
var assert = require('assert');
var expect = require('chai').expect;

describe('Warehouse', function() {
  describe('instructions', function() {
    it('are given for the robot', function() {
      var warehouse = new Warehouse();
      warehouse.commands("ns")
      assert.deepEqual(warehouse.instructions, ["n", "s"]);
    });

    it('can be any number of characters', function() {
      var warehouse = new Warehouse();
      warehouse.commands("nppsse")
      assert.deepEqual(warehouse.instructions, ["n", "p", "p", "s", "s", "e"]);
    });

    it('can be unlimited', function() {
      var warehouse = new Warehouse();
      warehouse.commands("newpsesennppppeeee")
      assert.deepEqual(warehouse.instructions, ["n", "e", "w", "p", "s", "e","s", "e","n", "n", "p", "p", "p", "p", "e","e","e","e",]);
    });

    it('can take directions in an array form', function() {
      var warehouse = new Warehouse();
      warehouse.commands(["s", "n", "e"])
      assert.deepEqual(warehouse.instructions, ["s", "n", "e"]);
    });
  });

  describe('belt', function() {
    it('should be able to give belt a position', function() {
      var warehouse = new Warehouse();
      warehouse.belt.givePosition(2, 5);
      assert.deepEqual(warehouse.belt.position, [ 2, 5 ])
    });

    it('should return x, y cordinates', function() {
      var warehouse = new Warehouse();
      warehouse.belt.givePosition(8, 1);
      assert.deepEqual(warehouse.belt.position, [ 8, 1 ])
    });
  });

  describe('crates', function() {
    it('should be able to give information about crate', function() {
      var warehouse = new Warehouse();
      warehouse.crate.details(2, 5, 2);
      assert.deepEqual(warehouse.crate.cratesArray, [ [ 2, 5, 2 ] ])
    });

    it('will return details about crates', function() {
      var warehouse = new Warehouse();
      warehouse.crate.details(4, 1, 6);
      assert.deepEqual(warehouse.crate.cratesArray, [ [ 4, 1, 6 ] ])
    });
  });

  describe('Moving robot', function() {
    it('will increase y when north', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(1,1);
      warehouse.commands("nesepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 1, 2 ]);
    });

    it('y cordinates will increase when N', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(4,2);
      warehouse.commands("nssepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 4, 3 ]);
    });

    it('will increase x when east', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(1,1);
      warehouse.commands("eesepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 2, 1 ]);
    });

    it('x cordinates will increase when E', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(4,2);
      warehouse.commands("essepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('will decrease y when south', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(5,3);
      warehouse.commands("sssepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('y cordinates will decrease when S', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(8,2);
      warehouse.commands("swsepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 8, 1 ]);
    });

    it('will decrease x when west', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(9,4);
      warehouse.commands("wpsepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 8, 4 ]);
    });

    it('x cordinates will decrease when W', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(0,2);
      warehouse.commands("wpsepp");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ -1, 2 ]);
    });
  });

  describe('Execution', function() {
    it('carries out instructions and once executes removes that instruction', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(0,2);
      warehouse.commands("wppdd");
      warehouse.output();
      assert.deepEqual(warehouse.instructions, [ "p", "p", "d", "d" ]);
    });
    it('carries out instructions and once executes removes that instruction', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(0,2);
      warehouse.commands("wnpdd");
      warehouse.output();
      assert.deepEqual(warehouse.instructions, [ "n", "p", "d", "d" ]);
    });
  });

  describe('Correct output', function() {
    it('returns the correct output when completes execution', function() {
      var warehouse = new Warehouse()
      warehouse.robot.givePosition(0,0)
      warehouse.belt.givePosition(0,2)
      warehouse.crate.details(0,1,10)
      warehouse.crate.details(-1,-2,5)
      warehouse.commands("npppnd")
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 0, 1 ]);
      warehouse.output();
      assert.deepEqual(warehouse.bags, 1);
    });

    it('does not accept anything that isnt NESWDP', function() {
      let spy = sinon.spy(console, 'log');
      var warehouse = new Warehouse();
      warehouse.commands("z");
      warehouse.output()
      assert(spy.calledWith(0))
      spy.restore();
    });
  });
});
