const Robot = require("../model/robot")
var assert = require('assert');
var expect = require('chai').expect;

describe('Robot', function() {
  describe('position', function() {
    it('should be given a postion and returns that position', function() {
      var robot = new Robot()
      robot.givePosition(2,1)
      assert.deepEqual(robot.position, [ 2, 1 ])
    });

    it('should return cordinated position', function() {
      var robot = new Robot()
      robot.givePosition(4,9)
      assert.deepEqual(robot.position, [ 4, 9 ])
    });
  });
});
