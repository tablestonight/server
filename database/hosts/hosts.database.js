(function() {
	var schema = require('./hosts.schema');
	var bcrypt = require('bcrypt');
	var Q = require("q");
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport(process.env.GMAIL_TRANSPORT);
	var uuid = require('node-uuid');
	var Nightclubs = require('./../locations/nightclubs/nightclubs.info');

	module.exports.createHost         = createHost;
	module.exports.loginHost          = loginHost;
	module.exports.verifyHost         = verifyHost;
	module.exports.updateHost         = updateHost;
	module.exports.findDayclubHosts   = findDayclubHosts;
	module.exports.findNightclubHosts = findNightclubHosts;

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

	function hashPassword(salt, info, newHost) {
		var deferred = Q.defer();
		bcrypt.hash(info.password, salt, function(error, hash) {
			if (error) {
				return deferred.reject(error);
			}
			if (!newHost) {
				return deferred.resolve(info.password);
			}
			return deferred.resolve(hash);
		});
		return deferred.promise;
	}

	function createHost(info, response) {

		var newHost = createNewHost(schema);

		createSalt()
			.then(function(salt) {
				var newHost = true;
				return hashPassword(salt, info, newHost);
			})
			.then(function(hash) {
				return saveNewHost(hash);
			})
			.then(function(newHost) {
				return response.send(true);
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
				},
				confirmed: false
			});
		}

		function saveNewHost(hash) {
			var deferred = Q.defer();
			newHost.password = hash;
			newHost.uuid = uuid.v4();
			newHost.save(function (error) {
				if (error) {
					if (error.code === 11000) {
						return deferred.reject('e-mail already taken. please use a different e-mail address.');
					}
					return deferred.reject(error);
				}
				sendConfirmationEmail(newHost.email, newHost.uuid);
				return deferred.resolve(newHost);
			});
			return deferred.promise;
		}
	}

	function sendConfirmationEmail(email, uuid) {
		var mailOptions = {
		    from: '"Connect Vegas Bot" <contact.connect.vegas@gmail.com>',
		    to: email,
		    subject: 'Welcome to Connect Vegas | Verify your account',
		    html: '<b>Thanks for signing up! </b> Please verify your account by clicking the link below:<br /><a href="' + process.env.URL + uuid + '">Verify your account</a>'
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
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

	function findExistingHostByUuid(info) {
		var deferred = Q.defer();
		schema.Hosts.where({ uuid: info.uuid}).findOne(function(error, host) {
			if (error) {
				return deferred.reject(error);
			}
			if (host) {
				return deferred.resolve(host);
			}
			return deferred.reject('Account not found. Please try again.');
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
			bcrypt.compare(info.password, host.password, function(error, passwordMatched) {
				if (error) {
					return deferred.reject(error);
				}
				if (passwordMatched) {

					if (!host.confirmed) {
						return deferred.reject('You must verify your account via e-mail.');
					}

					return deferred.resolve(host);
				}
				return deferred.reject('Incorrect credentials. Please try again.')
			});
			return deferred.promise;
		}
	};

	function verifyHost(info, response) {
		findExistingHostByUuid(info)
			.then(function(host) {
				return enableHost(host)
			})
			.then(function() {
				response.send(null);
			})
			.fail(function(error) {
				response.send({error: error});
			});

		function enableHost(host) {
			var deferred = Q.defer();
			host.confirmed = true;
			host.save(function(error) {
				if (!error) {
					return deferred.resolve(null);
				}
				return deferred.reject(error);
			});
			return deferred.promise;
		}
	}

	function updateHost(info, response) {

		var host = null;

		findExistingHost(info)
			.then(function(foundHost) {
				host = foundHost;
				return createSalt();
			})
			.then(function(salt) {
				var newHost = false;
				return hashPassword(salt, info, newHost);
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

	function findDayclubHosts(dayclub, response) {

		getHostsforDayclub(dayclub)
			.then(function(hosts) {
				return response.send(hosts);
			})
			.fail(function(error) {
				return response.send({error: error});
			});

		function getHostsforDayclub(dayclub) {
			var deferred = Q.defer();
			schema.Hosts.where({ dayClub: dayclub }).find(function(error, hosts) {
				if (error) {
					return deferred.reject(error);
				}
				return deferred.resolve(hosts);
			});
			return deferred.promise;
		}
	}

	function findNightclubHosts(nightclub, response) {

		getHostsforNightclub(nightclub)
			.then(function(hosts) {
				return response.send(hosts);
			})
			.fail(function(error) {
				return response.send({error: error});
			});

		function getHostsforNightclub(nightclub) {
			var deferred = Q.defer();
			schema.Hosts.where({ nightClub: nightclub }).find(function(error, hosts) {
				if (error) {
					return deferred.reject(error);
				}
				var nightclubInfo = {};
				nightclubInfo.hosts = hosts;
				nightclubInfo.info = Nightclubs.list[nightclub];
				return deferred.resolve(nightclubInfo);
			});
			return deferred.promise;
		}
	}
})();
