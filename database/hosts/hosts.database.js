(function() {
	var schema = require('./hosts.schema');
	var bcrypt = require('bcrypt');
	var Q = require("q");

	module.exports.createHost = createHost;
	module.exports.loginHost  = loginHost;
	module.exports.updateHost = updateHost;

	function createHost(info, response) {
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
			}
		});

		createSalt()
			.then(function(salt) {
				return hashPassword(salt);
			})
			.then(function(hash) {
				newHost.password = hash;
				return saveNewHost();
			})
			.then(function(newHost) {
				return response.send(newHost);
			})
			.fail(function(error) {
				return response.send(error);
			})

		function saveNewHost() {
			var deferred = Q.defer();
			newHost.save(function (error) {
				if (error) {
					deferred.reject(error);
				} else {
					deferred.resolve(newHost);
				}
			});
			return deferred.promise;
		}

		function hashPassword(salt) {
			var deferred = Q.defer();
			bcrypt.hash(info.password, salt, function(error, hash) {
				if (error) {
					deferred.reject(error);
				} else {
					deferred.resolve(hash);
				}
			});
			return deferred.promise;
		}

		function createSalt() {
			var deferred = Q.defer();
			bcrypt.genSalt(10, function(error, salt) {
				if (error) {
					deferred.reject(error);
				} else {
					deferred.resolve(salt);
				}
			});
			return deferred.promise;
		}
	};

	function loginHost(info, response) {
		schema.Hosts.where({ email: info.email}).findOne(function(error, host) {
			if (error) {
				response.send(error);
				return;
			}
			bcrypt.compare(info.password, host.password, function(error, result) {
				if (error) {
					response.send(error);
					return;
				}
				if (result) {
					response.send(host);
					return;
				}
				response.send("Incorrect credentials. Please try again.");
			});
		});
	};

	function updateHost(info, response) {
		schema.Hosts.where({ email: info.email}).findOne(function(error, host) {
			if (error) {
				response.send(error);
				return;
			}
			bcrypt.genSalt(10, function(error, salt) {
				bcrypt.hash(info.password, salt, function(err, hash) {
					if (error) {
						response.send(error);
						return;
					}
					host.password    = hash;
					host.firstName   = info.firstName;
					host.lastName    = info.lastName;
					host.nightClub   = info.nightClub;
					host.mobile      = info.mobile;
					host.email       = info.email;
					host.dayClub     = info.dayClub;
					host.nickName    = info.nickName;
					host.description = info.description;
					host.socialMedia = info.socialMedia;
					host.save(function (error, updatedHost) {
						if (error) {
							response.send(error);
							return;
						}
						response.send(updatedHost);
					});
				});
			});
		});
	};
})();
