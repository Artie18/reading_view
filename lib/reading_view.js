"use strict"

var jsdom           = require('jsdom'),
    request         = require('request'),
    is              = require('check-types'),
    config          = require('../config.json'),
    nonCustomizable = require('./non-customizable');


exports.convert = function (url, params, cb) {
  const self = this;

  if(is.not.assigned(params) || is.emptyObject(params)) {
    nonCustomizable.convert(url, function (err, res) {
      respond(err, res, cb);
    });
    return;
  }


  params.title = params.title || {}

  self.cbPresent       = is.function(cb);
  self.articleSelector = params.articleQuery || 'article';
  self.tagsToInclude   = (is.array(params.tagQueries) && params.tagQueries.lenght > 0) ? params.tagQueries : ['p','img'];
  self.title           = {
    textOnly:   params.title.textOnly   || true,
    tagToWrap:  params.title.tagToWrap  || 'h2',
    query:      params.title.query      || (function () {
      let resStr = [];
      for(let i = 1; i < 7; i++) {
        resStr.push(`${self.articleSelector} h${i}:first`);
      }
      return resStr.join(', ');
    }())
  }

  self.tagsQuery = function () {
    let resultStrings = [];

    for(let i = 0; i < self.tagsToInclude.length; i++) {
      resultStrings.push(`${self.articleSelector} ${self.tagsToInclude[i]}`);
    }
    return resultStrings.join(', ')
  }

  request({ uri: url }, function (error, response, body) {

  if (error && response.statusCode !== 200) {
    respond(err, undefined, cb);
  }

  jsdom.env({
    html: body,
    scripts: [
      config.jqueryUrl
    ],
    done: function (err, window) {
        if (is.assigned(err) && self.cbPresent) {
          respond(err, undefined, cb);
        } else {
          let $     = window.jQuery,
              res   = "",
              title = (function () {
                let element = $(self.title.query).first();
                let fElement = (self.title.textOnly ? $(self.title.tagToWrap).html(element.text()) : element)[0]
                if(is.assigned(fElement)) {
                  return fElement.outerHTML;
                } else {
                  '';
                }

              }())

          res += title;

          $(self.tagsQuery()).each(function (i, el) {
            res += el.outerHTML;
          });
          respond(err, res, cb);
        }
      }
    });
  });
}

function respond (err, res, cb) {
  if(err) {
    cb(err);
  } else if(is.function(cb)) {
    cb(undefined, res);
  }
}
