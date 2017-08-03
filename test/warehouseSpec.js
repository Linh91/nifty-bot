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
      warehouse.belt.position(2, 5);
      assert.equal(warehouse.belt.x, 2)
      assert.equal(warehouse.belt.y, 5)
    });

    it('should return x, y cordinates', function() {
      var warehouse = new Warehouse();
      warehouse.belt.position(8, 1);
      assert.equal(warehouse.belt.x, 8)
      assert.equal(warehouse.belt.y, 1)
    });
  });

  describe('crate', function() {
    it('should be able to give information about crate', function() {
      var warehouse = new Warehouse();
      warehouse.crate.description(2, 5, 2);
      assert.deepEqual(warehouse.crate.des, [ [ 2, 5, 2 ] ]);
    });

    it('will return details about crate', function() {
      var warehouse = new Warehouse();
      warehouse.crate.description(4, 1, 6);
      assert.deepEqual(warehouse.crate.des, [ [ 4, 1, 6 ] ])
    });
  });
})
