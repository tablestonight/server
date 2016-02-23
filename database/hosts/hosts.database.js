(function() {
	var schema = require('./hosts.schema');
	var bcrypt = require('bcrypt');
	var Q = require("q");

	module.exports.createHost = createHost;
	module.exports.loginHost  = loginHost;
	module.exports.updateHost = updateHost;

	///////////////////////////////////////////////////////////////////////////

	function createSalt() {
		var deferred = Q.defer();
		bcrypt.genSalt(10, function(error, salt) {
			if (error) {
				return deferred.reject(error);
			}
			return deferred.resolve(salt);
		});
		return deferred.promise;
	}

	function hashPassword(salt, info) {
		var deferred = Q.defer();
		bcrypt.hash(info.password, salt, function(error, hash) {
			if (error) {
				return deferred.reject(error);
			}
			return deferred.resolve(hash);
		});
		return deferred.promise;
	}

	function createHost(info, response) {

		var newHost = createNewHost(schema);

		createSalt()
			.then(function(salt) {
				return hashPassword(salt, info);
			})
			.then(function(hash) {
				return saveNewHost(hash);
			})
			.then(function(newHost) {
				return response.send(newHost);
			})
			.fail(function(error) {
				return response.send({error: error});
			});

		///////////////////////////////////////////////////////////////////////////

		function createNewHost(schema) {
			return new schema.Hosts({
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
		}

		function saveNewHost(hash) {
			var deferred = Q.defer();
			newHost.password = hash;
			newHost.save(function (error) {
				if (error) {
					if (error.code === 11000) {
						return deferred.reject('e-mail already taken. please use a different e-mail address.');
					}
					return deferred.reject(error);
				}
				return deferred.resolve(newHost);
			});
			return deferred.promise;
		}
	}

	function findExistingHost(info) {
		var deferred = Q.defer();
		schema.Hosts.where({ email: info.email}).findOne(function(error, host) {
			if (error) {
				return deferred.reject(error);
			}
			if (host) {
				return deferred.resolve(host);
			}
			return deferred.reject('E-mail not found. Please try again.');
		});
		return deferred.promise;
	}

	function loginHost(info, response) {

		findExistingHost(info)
			.then(function(host) {
				return verifyPassword(host, info)
			})
			.then(function(host) {
				response.send(host);
			})
			.fail(function(error) {
				response.send({error: error});
			});

		///////////////////////////////////////////////////////////////////////////

		function verifyPassword(host, info) {
			var deferred = Q.defer();
			bcrypt.compare(info.password, host.password, function(error, passwordMached) {
				if (error) {
					return deferred.reject(error);
				}
				if (passwordMached) {
					return deferred.resolve(host);
				}
				return deferred.reject('Incorrect credentials. Please try again.')
			});
			return deferred.promise;
		}
	};

	function updateHost(info, response) {

		var host = null;

		findExistingHost(info)
			.then(function(foundHost) {
				host = foundHost;
				return createSalt();
			})
			.then(function(salt) {
				return hashPassword(salt, info);
			})
			.then(function(hash) {
				return updateHost(hash, info, host);
			})
			.then(function(updatedHost) {
				return response.send(updatedHost);
			})
			.fail(function(error) {
				return response.send({error: error});
			});

		///////////////////////////////////////////////////////////////////////////

		function updateHost(hash, info, host) {
			var deferred = Q.defer();
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

			host.save(function (error) {
				if (error) {
					return deferred.reject(error);
				}
				return deferred.resolve(host);
			});
			return deferred.promise;
		}

	};
})();
