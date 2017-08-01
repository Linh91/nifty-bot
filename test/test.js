var sim = require("../robot-sim")
var assert = require('assert');

describe('Robot', function() {
  describe('conveyor-belt', function() {
    it('should be given a postion and returns that position', function() {
      var belt = new sim.Belt()
      belt.place(2,1)
      console.log("BOB")
      assert.equal(belt.x, 2)
      assert.equal(belt.y, 1)
    });
  });
});
