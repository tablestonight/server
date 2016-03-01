(function() {
	var mongoose = require("mongoose");

	var hostSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		nightClub: String,
		mobile: String,
		email: {
			type: String,
			unique: true
		},
		password: String,
		dayClub: String,
		nickName: String,
		description: String,
		socialMedia: {},
		confirmed: Boolean,
		uuid: String
	});

	module.exports.Hosts = mongoose.model('Hosts', hostSchema);

	// {
	// 	"firstName": "Justin",
	// 	"lastName": "Jrobot",
	// 	"nightClub": "XS",
	// 	"mobile": "1333333337",
	// 	"email": "jro@bot.com",
	// 	"password": "lebron",
	// 	"dayClub": "Wet Republic",
	// 	"nickName": "jro_bot",
	// 	"description": "ima robot",
	// 	"socialMedia": {
	// 		"twitter": "@jrobot",
	// 		"instagram": "@jrobot"
	// 	}
	// }
})();
