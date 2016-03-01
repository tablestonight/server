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

	router.post('/host/verify', function(request, response) {
		var info = request.body;
		hostDb.verifyHost(info, response);
	});

	router.get('/dayclub/:name', function(request, response) {
		var dayclub = request.params.name;
		hostDb.findDayclubHosts(dayclub, response);
	});

	router.get('/nightclub/:name', function(request, response) {
		var nightclub = request.params.name;
		hostDb.findNightclubHosts(nightclub, response);
	});

	router.get('/origin', function(request, response) {
		return response.send('http://localhost:1337/');
	});

	module.exports = router;
})();
