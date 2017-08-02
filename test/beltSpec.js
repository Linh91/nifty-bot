var sim = require("../belt")
var assert = require('assert');

describe('Belt', function() {
  describe('conveyor-belt', function() {
    it('should be given a postion and returns that position', function() {
      var belt = new sim.Belt()
      belt.place(2,1)
      assert.equal(belt.x, 2)
      assert.equal(belt.y, 1)
    });

    it('should return the correct cordinates of positive', function() {
      var belt = new sim.Belt()
      belt.place(4,2)
      assert.equal(belt.x, 4)
      assert.equal(belt.y, 2)
    });
  });
});
