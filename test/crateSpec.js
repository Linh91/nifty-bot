const Crates = require("../model/crate")
var assert = require('assert');

describe('Crate', function() {
  describe('position', function() {
    it('should be given a postion and returns that position', function() {
      var crate = new Crates()
      crate.details(9, 1, 5)
      assert.deepEqual(crate.cratesArray, [ [ 9, 1, 5 ] ])
    });

    it('should return an array of three elements', function() {
      var crate = new Crates()
      crate.details(8, 3, 8)
      assert.deepEqual(crate.cratesArray, [ [ 8, 3, 8 ] ])
    });
  });
});
