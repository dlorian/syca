EmberApp.Router.map(function () {

	this.resource('home');

	this.resource('tours', { path: 'tours'});

	this.resource('tour', { path: 'tour' }, function() {
		this.route('details', {path: '/:tour_id'}),
		this.route('new');	
	});

	this.resource('statistics', { path: 'statistics' });
  
});