(function() {
	module.exports.list = dayClubs();

	function dayClubs() {
		var dayClubInfo = {};

		initializeData();

		return dayClubInfo;

		function createProperty(clubName, description, location, hours, djs) {
			dayClubInfo[clubName] = {
				description: description,
				location: location,
				hours: hours,
				djs: djs
			};
		}

		function initializeData() {

			createProperty('Azure',
				'Set apart from the crowds, Azure offers an atmosphere of exclusivity for those who seek refined experiences. Worship the sun on one of 15 daybeds and 26 lounge chairs with optional umbrellas, then go for a refreshing dip in your choice of two swimming pools or soak your cares away in the jetted hot tub.',
				'none listed.',
				'none listed.');

			createProperty('Bare',
				'none listed.',
				'The Mirage',
				'Open today - 11am–6pm');

			createProperty('Daylight',
				'none listed.',
				'none listed.',
				'Open today - 11AM–6PM');

			createProperty('Drais Beach Club',
				'Beach club party spot with luxe leather seating & private tables with a panoramic view.',
				'The Cromwell',
				'Friday - Sunday: 11AM - 6PM');

			createProperty('Encore Beach Club',
				'Indoor-outdoor beach club venue at Encore offering expansive pool, cabanas & top dance DJs.',
				'Encore',
				'Friday: 12pm - 6pm, Saturday - Sunday: 11AM - 6PM',
				'Home of: Zedd, Diplo, Avicci and more!');

			createProperty('Foxtail Pool Club',
				'Lounge and eatery on a pool deck serving American cuisine and seafood, plus specialty cocktails.',
				'SLS Las Vegas Hotel & Casino',
				'Daily: 10:30am – 7pm');

			createProperty('Lavo Brunch',
				'Ultrachic, high-energy Italian eatery with a private entrance to a thumping dance floor upstairs.',
				'The Venetian',
				'Saturday: 10am-1pm, Sunday: 10am-4pm');

			createProperty('Liquid Pool',
				'Vibrant, upscale pool club & 50-seat restaurant offering private cabanas & DJs spinning house tunes.',
				'Aria Resort & Casino',
				'Wednesday – Sunday: 11am – 6pm');

			createProperty('Marquee Day Club',
				'Trendy, happening casino club with global DJs, high-tech effects, multiple dance floors & pool deck',
				'The Cosmopolitan of Las Vegas',
				'Daily: 11am - Sunset');

			createProperty('Moorea Beach Club',
				'Secluded, top-optional Mandalay Bay dayclub offering luxe cabanas & daybeds, plus poolside massages.',
				'Mandalay Bay',
				'Daily: 8am-5pm');

			createProperty('Ditch Fridays',
				'Stylish hotel with 2 outdoor pools & a spa, plus a casino & multiple restaurants/bars.',
				'Palms',
				'Open today - 9am–5pm');

			createProperty('Rehab Beach Club',
				'Accommodations range from ultra-modern rooms with WiFi, minibars, flat-screen TVs and Bose stereo systems to suites with 40-inch flat-screens, huge bathtubs, and living areas. Some suites and villas also feature band-themed decor, private terraces, and wet bars.',
				'none listed.',
				'none listed.');

			createProperty('TAO Beach',
				'Pan-Asian themed poolside venue on top of TAO nightclub.',
				'The Venetian',
				'Saturday, Sunday: 11am - Close');

			createProperty('Wet Republic',
				'Bustling, sprawling dayclub offering multiple pools, top dance DJs, cabanas, daybeds & lounge.',
				'MGM Grand',
				'Friday - Monday: 11am - Close',
				'Home of: Tiesto, Steve Aoki, Hardwell and more!');

		}
	}
})();
