"use strict";
require('traceur');
var $__0 = $traceurRuntime.initGeneratorFunction(g);
var a = 1;
function g() {
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $ctx.state = 2;
          return 100;
        case 2:
          $ctx.maybeThrow();
          $ctx.state = 4;
          break;
        case 4:
          console.log(a + 100);
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__0, this);
}
var it = g();
it.next();
it.next();
function timeout(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}
timeout(100).then(function() {
  console.log('done');
});
