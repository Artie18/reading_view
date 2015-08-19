var is = require('check-types');

exports.respond = function (err, res, cb) {
  if(err) {
    cb(err);
  } else if(is.function(cb)) {
    cb(undefined, res);
  }
}
