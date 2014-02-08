EmberApp.DateValidator = Ember.Object.extend({

    validatorConfig: {},

    init: function() {
        // Initialize a hash used for validation
        var BaseValidator = new EmberApp.BaseValidator(); 
        var config = {
            'type': this.typeValidator,
            'presence': BaseValidator.presenceValidatr,
        };
        this.set('validatorConfig', config);
    },

    validate: function(fieldValidation, fieldValue) {
        var me = this;
        $.each(fieldValidation, function(name, validator) {
            try {
                if(!me.validatorConfig[name]) {
                    throw new Error('Date validation error: Invalid validator ' + name);
                }
                me.validatorConfig[name](validator, fieldValue);
            }
            catch(err) {
                throw new Error('Date validation error: ' + err.message);
            }
        });
    },

    typeValidator: function(fieldValue) {
        if(!fieldValue instanceof Date) {
            throw new Error('Given value '+ fieldValue +' is no type of Date as expected.');
        }
    }
});