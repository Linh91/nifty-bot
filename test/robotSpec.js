var bot = require("../robot")
var assert = require('assert');

describe('Robot', function() {
  describe('position', function() {
    it('should be given a postion and returns that position', function() {
      var robot = new bot.Robot()
      robot.position(2,1)
      assert.equal(robot.x, 2)
      assert.equal(robot.y, 1)
    });

    it('should return cordinated position', function() {
      var robot = new bot.Robot()
      robot.position(4,9)
      assert.equal(robot.x, 4)
      assert.equal(robot.y, 9)
    });
  });

  describe('instructions', function() {
    it('are given for the robot', function() {
      var robot = new bot.Robot()
      assert.deepEqual(robot.instruct("ns"), ["n", "s"])
    });

    it('can be any number of characters', function() {
      var robot = new bot.Robot()
      assert.deepEqual(robot.instruct("nppsse"), ["n", "p", "p", "s", "s", "e"])
    });

    it('can be unlimited', function() {
      var robot = new bot.Robot()
      assert.deepEqual(robot.instruct("newpsesennppppeeee"), ["n", "e", "w", "p", "s", "e","s", "e","n", "n", "p", "p", "p", "p", "e","e","e","e",])
    });
  });
});
