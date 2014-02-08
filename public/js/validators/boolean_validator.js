EmberApp.BooleanValidator = Ember.Object.extend({

    validatorConfig: {},

    init: function() {
        var NumberValidator = new EmberApp.NumberValidator();
        // Initialize a hash used for validation
        var config = {
            'type': this.typeValidator,
            'presence': this.presenceValidator,
        };
        this.set('validatorConfig', config);
    },

    typeValidator: function(value) {
        if(typeof value !== 'boolean') {
            throw new Error('Given value '+ fieldValue +' is no type of boolean as expected.');
        }
    }
});