const Robot = require("../model/robot")
var assert = require('assert');
var expect = require('chai').expect;

describe('Robot', function() {
  describe('position', function() {
    it('should be given a postion and returns that position', function() {
      var robot = new Robot()
      robot.position(2,1)
      assert.equal(robot.x, 2)
      assert.equal(robot.y, 1)
    });

    it('should return cordinated position', function() {
      var robot = new Robot()
      robot.position(4,9)
      assert.equal(robot.x, 4)
      assert.equal(robot.y, 9)
    });
  });

  describe('instructions', function() {
    it('are given for the robot', function() {
      var robot = new Robot();
      assert.deepEqual(robot.instruct("ns"), ["n", "s"]);
    });

    it('can be any number of characters', function() {
      var robot = new Robot();
      assert.deepEqual(robot.instruct("nppsse"), ["n", "p", "p", "s", "s", "e"]);
    });

    it('can be unlimited', function() {
      var robot = new Robot();
      assert.deepEqual(robot.instruct("newpsesennppppeeee"), ["n", "e", "w", "p", "s", "e","s", "e","n", "n", "p", "p", "p", "p", "e","e","e","e",]);
    });

    describe('belt', function() {
      it('should be able to give belt a position', function() {
        var robot = new Robot();
        robot.belt.position(2, 5);
        assert.equal(robot.belt.x, 2)
        assert.equal(robot.belt.y, 5)
      });

      it('should return x, y cordinates', function() {
        var robot = new Robot();
        robot.belt.position(8, 1);
        assert.equal(robot.belt.x, 8)
        assert.equal(robot.belt.y, 1)
      });
    });

    describe('crate', function() {
      it('should be able to give information about crate', function() {
        var robot = new Robot();
        robot.crate.description(2, 5, 2);
        assert.deepEqual(robot.crate.des, [ [ 2, 5, 2 ] ])
      });

      // it('should return x, y cordinates', function() {
      //   var robot = new Robot();
      //   robot.belt.position(8, 1);
      //   assert.equal(robot.belt.x, 8)
      //   assert.equal(robot.belt.y, 1)
      // });
    });
  });
});
