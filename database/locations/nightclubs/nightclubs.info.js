(function() {
	module.exports.list = nightClubs();

	function nightClubs() {
		var nightClubInfo = {};

		initializeData();

		return nightClubInfo;

		function createProperty(clubName, description, location, hours, djs) {
			nightClubInfo[clubName] = {
				description: description,
				location: location,
				hours: hours,
				djs: djs
			};
		}

		function initializeData() {

			createProperty('XS',
				'Lavish, gold-accented dance club in Encore featuring dance floor, poolside patio & headliner DJs.',
				'3131 S Las Vegas Blvd, Las Vegas, NV 89109',
				'Open today - 10pm–4am');

			createProperty('Sayers Club',
				'As one of Hollywood’s best-loved live music venues, The Sayers Club exudes a sense of rogue sophistication and musicianship that perfectly complements its second location within SLS Las Vegas.',
				'2535 S Las Vegas Blvd, Las Vegas, NV 89109',
				'Open today - 10pm–2am');

			createProperty('Omnia',
				'Vast Caesars club offers Top 40/hip-hop DJs plus bottle service & Strip views with Miami Beach vibe.',
				'Caesars Palace',
				'Open today - 10:30pm–4am');

			createProperty('The Bank',
				'Gilded & crystal-adorned Bellagio club offering multiple levels of bottle service plus celeb guests.',
				'Bellagio',
				'Thursday – Sunday: 10:30pm – 4am');

			createProperty('Tao',
				'A beloved Las Vegas Pan-Asian themed lounge and nightclub.',
				'The Venetian',
				'Thursday - Saturday: 11pm - Close');

			createProperty('Surrender',
				'Lavishly-appointed dance club & lounge with poolside seating & pole dancers in a hipster scene.',
				'Encore',
				'Wednesday, Friday, Saturday: 11pm - Close',
				'Home of: Dillion Francis, Skrillex, DJ Snake and more!');

			createProperty('Marquee',
				'Trendy, happening casino club with global DJs, high-tech effects, multiple dance floors & pool deck.',
				'The Cosmopolitan of Las Vegas',
				'Friday, Saturday, Monday: 10pm – 5am');

			createProperty('Light',
				'Electronic music hot spot at Mandalay Bay featuring giant video walls & Cirque du Soleil acrobatics.',
				'Mandalay Bay',
				'Wednesday, Friday, and Saturday 10:30pm – 4am');

			createProperty('LAX',
				'Lavish, leather-adorned Luxor club with hip-hop & house DJs, live performances & elevated VIP area.',
				'Luxor Hotel & Casino',
				'Wednesday – Saturday 10:30pm – 4am');

			createProperty('Lavo',
				'Ultrachic, high-energy Italian eatery with a private entrance to a thumping dance floor upstairs.',
				'The Venetian',
				'Sunday – Friday: 5pm – 12am, Saturday 7pm – 12am');

			createProperty('Hyde',
				'Sprawling, stylish nightspot at Bellagio with patios overlooking fountains & multiple lounge spaces.',
				'Bellagio',
				'Sunday – Thursday: 5pm – 1am, Friday, Saturday: 5p – 4a');

			createProperty('Hakkasan',
				'Renowned London-based Asian-fusion brand presents this massive MGM Grand nightclub, lounge.',
				'MGM Grand',
				'Thursday - Sunday: 11pm - Close',
				'Home of: Tiesto, Calvin Harris, Steve Aoki and more!');

			createProperty('Foxtail',
				'Nightclub exuding style, sophistication and luxury with an edge.',
				'SLS Las Vegas',
				'Friday, Saturday: 11pm - Close');

			createProperty('1OAK',
				'Fashionable nightclub catering to celebrity entertainers & upscale-chic crowds in a ritzy scene.',
				'The Mirage',
				'none listed');

			createProperty('Foundation Room',
				'Vibrant, luxurious lounge intimately placed on the top floor of Mandalay Bay, for breathetaking views of the city.',
				'Mandalay Bay',
				'Daily, 5PM - Close');

			createProperty('Drais',
				'Dimly lit late-night party spot with luxe leather seating & private tables in swanky surrounds.',
				'The Cromwell',
				'none listed');
		}
	}
})();
