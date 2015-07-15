var readingView = require('./lib/reading_view');

readingView.convert('http://new.disney.ru', {}, function (err, res) {
  console.log(err);
  console.log(res);
});
