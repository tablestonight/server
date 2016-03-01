(function() {
  var express    = require('express');
  var bodyParser = require('body-parser');
  var app        = express();
  var db         = require('./database/database.config');
  var server     = require('http').Server(app);
  var routes     = require('./routes');

  // var keys = require('./server/securityKeys.js');

  // if (process.env.PORT) {
  //   keys = require('./server/exampleSecurityKeys.js');
  // }

  initializeServer();

  function initializeServer() {
    app.use(bodyParser.json());
    app.use(allowCrossDomain);
    app.use(routes);
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/client');
    app.use(express.static(__dirname + '/client'));

    app.get('/', function(request, response) {
      response.render('index');
    });

    var port = process.env.PORT || 1337;
    server.listen(port, function() {
      console.log('Express server listening on port ' + server.address().port);
    });

    function allowCrossDomain(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      next();
    }
  }

})();
