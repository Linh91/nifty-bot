const Warehouse = require("../model/warehouse")
var assert = require('assert');
var expect = require('chai').expect;

describe('Warehouse', function() {
  describe('instructions', function() {
    it('are given for the robot', function() {
      var warehouse = new Warehouse();
      warehouse.instruct("ns")
      assert.deepEqual(warehouse.instructions, ["n", "s"]);
    });

    it('can be any number of characters', function() {
      var warehouse = new Warehouse();
      warehouse.instruct("nppsse")
      assert.deepEqual(warehouse.instructions, ["n", "p", "p", "s", "s", "e"]);
    });

    it('can be unlimited', function() {
      var warehouse = new Warehouse();
      warehouse.instruct("newpsesennppppeeee")
      assert.deepEqual(warehouse.instructions, ["n", "e", "w", "p", "s", "e","s", "e","n", "n", "p", "p", "p", "p", "e","e","e","e",]);
    });

    it('can take directions in an array form', function() {
      var warehouse = new Warehouse();
      warehouse.instruct(["s", "n", "e"])
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

  describe('crate', function() {
    it('should be able to give information about crate', function() {
      var warehouse = new Warehouse();
      warehouse.crate.description(2, 5, 2);
      assert.deepEqual(warehouse.crate.position, [ 2, 5 ])
      assert.equal(warehouse.crate.bags, 2)
    });

    it('will return details about crate', function() {
      var warehouse = new Warehouse();
      warehouse.crate.description(4, 1, 6);
      assert.deepEqual(warehouse.crate.position, [ 4, 1 ])
      assert.equal(warehouse.crate.bags, 6)
    });
  });

  describe('Moving robot', function() {
    it('will increase y when north', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(1,1);
      warehouse.instruct("n");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 1, 2 ]);
    });

    it('y cordinates will increase when N', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(4,2);
      warehouse.instruct("n");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 4, 3 ]);
    });

    it('will increase x when east', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(1,1);
      warehouse.instruct("e");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 2, 1 ]);
    });

    it('x cordinates will increase when E', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(4,2);
      warehouse.instruct("e");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('will decrease y when south', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(5,3);
      warehouse.instruct("s");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 5, 2 ]);
    });

    it('y cordinates will decrease when S', function() {
      var warehouse = new Warehouse();
      warehouse.robot.givePosition(8,2);
      warehouse.instruct("s");
      warehouse.output();
      assert.deepEqual(warehouse.robot.position, [ 8, 1 ]);
    });
  });
});
