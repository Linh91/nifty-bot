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
});
