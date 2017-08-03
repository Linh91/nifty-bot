const Crate = require("../model/crate")
var assert = require('assert');

describe('Crate', function() {
  describe('position', function() {
    it('should be given a postion and returns that position', function() {
      var crate = new Crate()
      crate.description(9, 1, 5)
      assert.deepEqual(crate.position, [ 9, 1 ])
      assert.equal(crate.bags, 5)
    });

    it('should return an array of three elements', function() {
      var crate = new Crate()
      crate.description(8, 3, 8)
      assert.deepEqual(crate.position, [ 8, 3 ])
      assert.equal(crate.bags, 8)
    });
  });
});
