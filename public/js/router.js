EmberApp.Router.map(function () {

	this.resource('home');

	this.resource('tours', { path: 'tours' } );

	this.resource('tour', function() {
		this.route('details', { path: '/show/:tour_id' });
		this.route('new');
	});

	this.resource('statistics', { path: 'statistics' });
  
});