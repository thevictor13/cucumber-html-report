var fs = require('fs');
var path = require('path');

// Shamelessly stolen from stackoverflow..
function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code !== 'EEXIST' ) {
      throw e;
    }
  }
}

exports.mkdirpSync = function(dirpath) {
  var parts = dirpath.split('/'); // path.sep
  for( var i = 1; i <= parts.length; i++ ) {
    mkdirSync( path.join.apply(null, parts.slice(0, i)) );
  }
};
