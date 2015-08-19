"use strict"

var Readability = require('./readability').Readability,
    jsdom       = require('jsdom'),
    request     = require('request'),
    responder   = require('./responder');

exports.convert = function (url, cb) {
  request({uri: url}, function (error, response, body) {
    if (error && response.statusCode !== 200) {
      responder.respond(err, undefined, cb);
    }
    jsdom.env({
      html: body,
      done: function(err, window) {
        if (is.assigned(err) && self.cbPresent) {
          responder.respond(err, undefined, cb);
        } else {
          let location = document.location;
          let uri = {
              spec: location.href,
              host: location.host,
              prePath: location.protocol + "//" + location.host,
              scheme: location.protocol.substr(0, location.protocol.indexOf(":")),
              pathBase: location.protocol + "//" + location.host + location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1)
            };
          let readability = new Readability(uri, document);
          responder(undefined, readability.parse(), cb);
        }
      }
    });
  });

}
