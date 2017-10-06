var http, director, cool, bot, router, server, port, cleverbot, Forecast;

http        = require('http');
director    = require('director');
API         = require('groupme').Stateless;
ImageService = require('groupme').ImageService;
cool        = require('cool-ascii-faces');
bot         = require('./bot.js');
cleverbot = require('cleverbot.io');

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

// getter = new director.http.Router({
//   '/'
// })

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("How did you even get here?");
}
