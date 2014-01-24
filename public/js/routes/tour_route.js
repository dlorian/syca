EmberApp.TourRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the 
  // top level ApplicationRoute; we're in transition... :-)
  model: function (param) {
    console.log('TourRoute');
    //console.log(param.id);
  }
});

EmberApp.TourDetailsRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the 
  // top level ApplicationRoute; we're in transition... :-)
  model: function (param) {
    console.log('TourDetailsRoute');
    //console.log(param.id);
  }
});

EmberApp.TourNewRoute = Ember.Route.extend({

  model: function () {
    console.log('TourNewRoute');
    // create a new empty record for type tour
    return this.get("store").createRecord('tour');
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function() {
    this.render('tour/new', { into: 'application' });
  }

  
});