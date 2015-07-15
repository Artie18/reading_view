var readingView = require('./lib/reading_view');


readingView.convert('http://realt.onliner.by/2015/07/15/belchite/', {}, function (err, res) {
  console.log(err);
  console.log(res);
});
