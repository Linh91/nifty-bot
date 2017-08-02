var box = require("../crate")
var assert = require('assert');

describe('Crate', function() {
  describe('position', function() {
    it('should be given a postion and returns that position', function() {
      var crate = new box.Crate()
      crate.description(9, 1, 5)
      assert.deepEqual(crate.des, [ [ 9, 1, 5 ] ])
    });

    it('should return an array of three elements', function() {
      var crate = new box.Crate()
      crate.description(8, 3, 8)
      assert.deepEqual(crate.des, [ [ 8, 3, 8 ] ])
    });
  });

  describe ('gummy bear quanity', function() {
    it('should be given the quanitites of gummy bears', function() {
      var crate = new box.Crate()
      crate.description(8, 3, 2)
      assert.equal(crate.x, 8)
      assert.equal(crate.y, 3)
    })
  })
});
