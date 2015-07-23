var readability = require('node-readability');

exports.convert = function (url, cb) {
  readability(url, function (err, article, meta) {
    if(err) {
      cb(err);
    } else {
      cb(undefined, article.content);
    }
  });
}
