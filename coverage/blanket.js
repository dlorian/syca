var path   = require('path');

// Set pathes for coverage
var src = [
    path.join(__dirname, '..', 'lib'),
    path.join(__dirname, '..', 'models')
];

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: src
});