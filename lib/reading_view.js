var jsdom   = require('jsdom'),
    request = require('request'),
    is      = require('check-types');

exports.convert = function (url, params, cb) {
  self = this;
  self.cbPresent = is.function(cb);

  request({ uri: url }, function (error, response, body) {

  if (error && response.statusCode !== 200) {
    cb(err, null);
  }

  jsdom.env({
    html: body,
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ],
    done: function (err, window) {
        if (is.assigned(err) && self.cbPresent) {
          cb(err, null);
        } else {
          var $   = window.jQuery,
              res = "";

          $('article p, article img').each(function (i, el) {
            res += el.outerHTML;
          });
          if(self.cbPresent) { cb(undefined, res); };
        }
      }
    });
  });
}
