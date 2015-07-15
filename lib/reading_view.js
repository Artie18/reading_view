"use strict";

var jsdom   = require('jsdom'),
    request = require('request'),
    is      = require('check-types');

exports.convert = function (url, params, cb) {
  const self                 = this;
  self.cbPresent       = is.function(cb);
  self.articleSelector = params.article || 'article';
  self.tagsToInclude   = (is.array(params.tags) && params.tags.lenght > 0) ? params.tags : ['p','img'];

  self.tagsQuery = function () {
    let resultStrings = [];

    for(let i = 0; i < self.tagsToInclude.length; i++) {
      resultStrings.push(`${self.articleSelector} ${self.tagsToInclude[i]}`);
    }
    return resultStrings.join(', ')
  }

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
              console.log(self.tagsQuery());
          $(self.tagsQuery()).each(function (i, el) {
            res += el.outerHTML;
          });
          if(self.cbPresent) { cb(undefined, res); };
        }
      }
    });
  });
}
