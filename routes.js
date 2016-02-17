(function() {
	var express = require('express');
	var router  = express.Router();
	var hostDb  = require('./database/hosts/hosts.database');

	router.post('/host/create', function(request, response) {
		var info = request.body;
		hostDb.createHost(info, response);
	});

	router.post('/host/login', function(request, response) {
		var info = request.body;
		hostDb.loginHost(info, response);
	});

	router.post('/host/update', function(request, response) {
		var info = request.body;
		hostDb.updateHost(info, response);
	});

	module.exports = router;
})();
