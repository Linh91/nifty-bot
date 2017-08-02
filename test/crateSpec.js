var box = require("../crate")
var assert = require('assert');

describe('Crate', function() {
  describe('crate', function() {
    it('should be given a postion and returns that position', function() {
      var crate = new box.Crate()
      crate.position(2,1)
      assert.equal(crate.x, 2)
      assert.equal(crate.y, 1)
    });

    // it('should return the correct cordinates of positive', function() {
    //   var belt = new sim.Belt()
    //   belt.position(4,2)
    //   assert.equal(belt.x, 4)
    //   assert.equal(belt.y, 2)
    // });
  });
});
