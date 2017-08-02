var bot = require("../robot")
var assert = require('assert');

describe('Robot', function() {
  describe('robot', function() {
    it('should be given a postion and returns that position', function() {
      var robot = new bot.Robot()
      robot.place(2,1)
      assert.equal(robot.x, 2)
      assert.equal(robot.y, 1)
    });
  });
});
