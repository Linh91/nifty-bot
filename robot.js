function Robot() {
  this.x = 0
  this.y = 0
}

Robot.prototype.position = function (x, y) {
  this.x = x
  this.y = y
};

Robot.prototype.instructions = function() {
  var args = arguments;
  var values =[]
  for (var a in args) {
    return(Object.values(args));
  }
};

// 
// function TestMe()
// {
//    var args = arguments;
//
//    for (var a in args)
//    {
//      return(Object.values(args));
//    }
// }
exports.Robot = Robot
