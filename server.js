var httpProxy = require('./vendor/http-proxy/node-http-proxy'),
    querystring = require('querystring');

var handleTweet = function (req, res, proxy) {
  var input = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) { input += chunk; });
  req.once('end', function () {
    var tweet = querystring.parse(input),
        blacklist = ['lat', 'long', 'place_id', 'display_coordinates'];
    for (var i = 0; i < blacklist.length; i++) {
      // if tweet has blacklisted property, reject
      if (tweet.hasOwnProperty(blacklist[i])) {
        console.log('bad tweet: ' + blacklist[i]);
        res.writeHead(400);
        res.write('Bad Request');
        return res.end();
      }
    }
    var options = {
      host: 'api.twitter.com',
      port: 80,
      buffer: {
        resume: function () {
          req.emit('data', input);
          req.emit('end');
        }
      }
    };
    process.nextTick(function () {
      proxy.proxyRequest(req, res, options);
    });
  });
};

var handleRest = function (req, res, proxy) {
  proxy.proxyRequest(req, res, { host: 'api.twitter.com', post: 80 });
};

httpProxy.createServer(function (req, res, proxy) {
  if (req.method == 'POST' && req.url == '/statuses/update.json') {
    return handleTweet(req, res, proxy);
  }
  handleRest(req, res, proxy);
}).listen(80);
