//  Format an ISO date using Moment.js
//  Usage: {{dateFormat creation_date format="MMMM YYYY"}}
Ember.Handlebars.helper('dateFormat', function(context, block) {
    debugger
  if (window.moment && moment(context).isValid()) {
    var format = block.hash.format || EmberApp.dateFormat;
    return moment(context).format(format);
  }
  else{
    return context;
  }
});