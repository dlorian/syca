EmberApp.NumberValidator = Ember.Object.extend({

    validatorConfig: {},

    init: function() {
        // Initialize a hash used for validation
        var BaseValidator = new EmberApp.BaseValidator(); 
        var config = {
            'type': this.typeValidator,
            'presence': BaseValidator.presenceValidator,
            'min': this.minValidator,
            'max': this.maxValidator,
            'equal': this.equalValidator,
        }
        this.set('validatorConfig', config);
    },

    validate: function(fieldValidation, fieldValue) {
        var me = this;
        $.each(fieldValidation, function(name, validator) {
            try {
                if(!me.validatorConfig[name]) {
                    throw new Error('Number validation error: Invalid validator ' + validator);
                }
                me.validatorConfig[name](validator, fieldValue);
            }
            catch(err) {
                throw new Error('Number validation error: ' + err.message);
            }
        });
    },

    typeValidator: function(fieldValue) {
        if(typeof fieldValue !== 'number') {
            throw new Error('Given value '+ fieldValue +' is no type of number as expected.');
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

    minValidator: function(validator, fieldValue) {
        if(typeof validator !== 'number') {
            throw new Error('Invalid value for validation. Number expected for min validation');
        }
        if(fieldValue < validator) {
            throw new Error('Invalid value '+ fieldValue +'. The value must be greater tha n '+ validator +'.');
        }
    },

    maxValidator: function(validator, fieldValue) {
        if(typeof validator !== 'number') {
            throw new Error('Invalid value for validation. Number expected for min validation');
        }
        if(fieldValue > validator) {
            throw new Error('Invalid value '+ fieldValue +'. The value must be smaller than '+ validator +'.');
        }
    },

    equalValidator: function(validator, fieldValue) {
        if(typeof validator !== 'number') {
            throw new Error('Invalid value for validation. Number expected for min validation');
        }
        if(fieldValue !== validator) {
            throw new Error('Invalid value '+ fieldValue +'. The value must be equal '+ validator +'.');
        }
    }
});