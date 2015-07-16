var assert      = require("assert"),
    readingView = require("../lib/reading_view");

describe('ReadingView', function() {
  describe('#convert()', function () {
    var links = [
      'http://www.theverge.com/2015/7/16/8978249/bunny-slugs-jorunna-parva',
      'http://www.theverge.com/2015/7/16/8978225/netflix-set-daily-streaming-record-orange-new-black',
      'http://realt.onliner.by/2015/07/16/akvapark-v-drimlende-2/',
      'http://auto.onliner.by/2015/07/16/dvor-8/',
      'http://people.onliner.by/2015/07/16/moskva-3',
      'http://news.tut.by/realty/456326.html',
      'http://finance.tut.by/news456392.html',
      'http://www.wired.com/2015/07/mystery-kazakhstani-sleeping-sickness/',
      'http://www.wired.com/2015/07/pentaquarks-physicists-psychedand-baffled/',
      'http://news.nationalgeographic.com/2015/07/150715-pluto-flyby-photos-pictures-closeup-space/',
      'http://www.kommersant.ru/doc/2769275',
      'http://lenta.ru/news/2015/07/16/ponomarev/'
    ];

    links.forEach(function (link) {
      it('res(' + link + ') should be a String', function () {
        readingView.convert(link, {}, function (err, res) {
          assert(typeof res === "string");
        });
      });
    });
  });
});
