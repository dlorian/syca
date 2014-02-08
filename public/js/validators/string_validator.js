EmberApp.StringValidator = Ember.Object.extend({
    
    validatorConfig: {},

    init: function() {
        // Initialize a hash used for validation
        var baseValidator = new EmberApp.BaseValidator(); 
        var config = {
            'type': this.typeValidator,
            'presence': function(fieldValidation, fieldValue) {
                baseValidator.presenceValidator(fieldValidation, fieldValue);
            },
            'pattern': this.patternValidator,
        };
        this.set('validatorConfig', config);
    },

    validate: function(fieldValidation, fieldValue) {
        var me = this;
        $.each(fieldValidation, function(name, validator) {
            try {
                if(!me.validatorConfig[name]) {
                    throw new Error('String validation error: Invalid validator ' + name);
                }
                me.validatorConfig[name](validator, fieldValue);
            }
            catch(err) {
                throw new Error('String validation error: ' + err.message);
            }
        });
    },

    typeValidator: function(value) {
        if(typeof value !== 'string') {
            throw new Error('Given value '+ fieldValue +' is no type of string as expected.');
        }
    },

    presenceValidator: function(validator, fieldValue) {
        if(validator === true) {
            if(!fieldValue) { 
                throw Error(fieldValue + 'is not defined'); 
            }
            else if(fieldValue === '') { 
                throw Error(fieldValue + 'is empty'); 
            } 
        }
    },

    patternValidator: function(validator, fieldValue) {
        if(!validator) { 
            throw new Error('Regular Expression for pattern comparision is not defiend'); 
        }

        var regexp = new RegExp(validator, 'g');

        if(!regexp.test(fieldValue)) {
            throw new Error('Given value '+ fieldValue +' does not match validation pattern.');
        }
    }
});