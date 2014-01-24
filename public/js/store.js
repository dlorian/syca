EmberApp.Store = DS.Store.extend({
  revision: 13 // Defines the revision for the used DS.Store implementation
});

DS.RESTAdapter.reopen({
    namespace: 'api' // Defines the path for backend services 
});

// Custom data type especially for object ids. Normal 
// DS.attr('number') does not provide numbers at such 
// size as it is used for object ids by the backend.
// DS.RESTAdapter.registerTransform('objectId', {
//   serialize: function(value) {
//     return value
//   },
//   deserialize: function(value) {
//     return value
//   }
// });

EmberApp.ObjectIdTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});


/* Not yet implemented!
DS.RESTAdapter.map('EmberApp.Tour',{
    track:{
        embedded:'always'
    }
})
*/
