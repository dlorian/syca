EmberApp.HomeRoute = EmberApp.AuthenticatedRoute.extend({
  // admittedly, this should be in IndexRoute and not in the
  // top level ApplicationRoute; we're in transition... :-)
  model: function () {
    console.log('HomeRoute');
  }
});
