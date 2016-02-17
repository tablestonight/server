var express = require('express');
var schema = require('./database/hosts.schema');
var bcrypt = require('bcrypt');

var router = express.Router();

router.post('/host/create', function(request, response) {
	var info = request.body;
	var newHost = new schema.Hosts({
		firstName: '',
		lastName: '',
		nightClub: '',
		mobile: '',
		email: info.email,
		password: info.password,
		dayClub: '',
		nickName: '',
		description: '',
		socialMedia: {
			instagram: '',
			twitter: ''
		},
		schedule: {
			'SUNDAY': [],
			'MONDAY': [],
			'TUESDAY': [],
			'WEDNESDAY': [],
			'THURSDAY': [],
			'FRIDAY': [],
			'SATURDAY': []
		}
	});
	bcrypt.genSalt(10, function(error, salt) {
		bcrypt.hash(info.password, salt, function(err, hash) {
			if (error) {
				response.send(error);
				return;
			}
			newHost.password = hash;
			newHost.save(function (error) {
				if (error) {
					response.send(error);
					return;
				}
				response.send(newHost);
			});
		})
	})
});

router.post('/host/login', function(request, response) {
	schema.Hosts.where({ email: request.body.email}).findOne(function(error, user) {
		if (error) {
			response.send(error);
			return;
		}
		bcrypt.compare(request.body.password, user.password, function(error, result) {
			if (error) {
				response.send(error);
				return;
			}
			if (result) {
				response.send(result);
				return;
			}
			response.send(false);
		});
	});
});

router.post('/host/update', function(request, response) {

});

module.exports = router;
