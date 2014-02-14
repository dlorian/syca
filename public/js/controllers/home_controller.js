EmberApp.HomeController = Ember.ObjectController.extend({

	recentToursNum : 3,

	recentTours : [
		{
			date: '01.08.2013',
			totalKm: '55,23',
			totalTime: '1:50:23'
		},
		{
			date: '02.08.2013',
			totalKm: '45,01',
			totalTime: '1:20:23'
		},
		{
			date: '03.08.2013',
			totalKm: '25,23',
			totalTime: '0:45:12'
		}
	],

	topTotalKm: [
		{
			date: '01.08.2013',
			totalKm: 72.10
		},
		{
			date: '02.08.2013',
			totalKm: 69.30,
		},
		{
			date: '03.08.2013',
			totalKm: 66.59
		}
	],

	topTime20: [
		{
			date: '01.08.2013',
			time: '32.10'
		},
		{
			date: '02.08.2013',
			time: '34.20',
		},
		{
			date: '03.08.2013',
			time: '34.21'
		}
	],

	topTime30: [
		{
			date: '01.08.2013',
			time: '52.10'
		},
		{
			date: '02.08.2013',
			time: '54.20',
		},
		{
			date: '03.08.2013',
			time: '54.21'
		}
	],

	topTopSpeed: [
		{
			date: '01.08.2013',
			speed: 50.12
		},
		{
			date: '02.08.2013',
			speed: 49.69,
		},
		{
			date: '03.08.2013',
			speed: 48.99
		}
	],

	topAvgSpeed: [
		{
			date: '01.08.2013',
			speed: 33.22
		},
		{
			date: '02.08.2013',
			speed: 32.39,
		},
		{
			date: '03.08.2013',
			speed: 32.33
		}
	],

	setRecentToursNum: function(num) {
		this.set('recentToursNum', num);
	},

	getRecentToursNum: function() {
		return this.get('recentToursNum');
	}
});