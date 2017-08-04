const Belt = require("../model/belt");
var assert = require('assert');

describe('Belt', function() {
  var belt;

  beforeEach(function() {
    belt = new Belt();
  });

  describe('conveyor-belt position', function() {
    it('should be given a postion and returns that position', function() {
      belt.givePosition(2,1);
      assert.deepEqual(belt.position, [ 2, 1 ]);
    });

    it('should return the correct cordinates of positive', function() {
      belt.givePosition(4,2);
      assert.deepEqual(belt.position, [ 4, 2 ]);
    });
  });
});
