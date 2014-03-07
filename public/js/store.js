EmberApp.Store = DS.Store.extend({
  revision: 13 // Defines the revision for the used DS.Store implementation
});

DS.RESTAdapter.reopen({
    namespace: 'api' // Defines the path for backend services
});

/**
 * Definiton of own datatype 'objectId'
 */
EmberApp.ObjectIdTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

/**
 * Definiton of own datatype 'time'
 */
EmberApp.TimeTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});