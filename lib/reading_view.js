"use strict";

var jsdom   = require('jsdom'),
    request = require('request'),
    is      = require('check-types'),
    config  = require('../config.json');

const DEFAULT_TITLE_TAG =

exports.convert = function (url, params, cb) {
  const self                 = this;
  self.cbPresent       = is.function(cb);
  self.articleSelector = params.articleQuery || 'article';
  self.tagsToInclude   = (is.array(params.tagQueries) && params.tagQueries.lenght > 0) ? params.tagQueries : ['p','img'];
  self.titleQuery        = params.titleQuery || (function () {
    let resStr = [];
    for(let i = 1; i < 7; i++) {
      resStr.push(`${self.articleSelector} h${i}:first`);
    }
    return resStr.join(', ');
  }());

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
      config.jqueryUrl
    ],
    done: function (err, window) {
        if (is.assigned(err) && self.cbPresent) {
          cb(err, null);
        } else {
          let $     = window.jQuery,
              res   = "",
              title = $(self.titleQuery)[0].outerHTML;

          res += title;

          $(self.tagsQuery()).each(function (i, el) {
            res += el.outerHTML;
          });
          if(self.cbPresent) { cb(undefined, res); };
        }
      }
    });
  });
}
