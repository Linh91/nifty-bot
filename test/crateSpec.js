var box = require("../crate")
var assert = require('assert');

describe('Crate', function() {
  describe('crate', function() {
    it('should be given a postion and returns that position', function() {
      var crate = new box.Crate()
      crate.position(9,1)
      assert.equal(crate.x, 9)
      assert.equal(crate.y, 1)
    });

    it('should return the correct cordinates of positive', function() {
      var belt = new box.Crate()
      belt.position(8,3)
      assert.equal(belt.x, 8)
      assert.equal(belt.y, 3)
    });
  });
});
