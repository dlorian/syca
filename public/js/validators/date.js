EmberApp.DateValidator = EmberApp.ValidatorBase.extend({

    dateValidationMessage: {
        'type': 'Der eingegeben Wert entspricht keinem gültigem Datum.',
        'format': 'Kein gültiges Datum angeben. Das Datum muss im Format "{0}" angegeben werden.',
    },

    init: function() {
        this._super();
        // Initialize a hash used for validation
        var config = {
            'type': this.typeValidator,
            'format': this.formatValidator
        };
        this.addValidatorConfig(config);
    },

    typeValidator: function(validator, field, fieldValue) {
        debugger
        var isValidDate = true;
        if(!fieldValue instanceof Date) {
            isValidDate = false;
            
        }
        else if(typeof fieldValue === 'string') {
            try {
               var timestamp = Date.parse(fieldValue); 
            }
            catch(err) {
                isValidDate = false; 
            }                
        }
        if(isValidDate === false) {
            errMsg = 'Given value "'+ fieldValue +'" is no type of Date as expected.';
            validationMsg = this.stringValidationMessage['type'];
            error = this.createValidationError(errMsg, validationMsg, validator);
            throw error;
        }        
    },

    formatValidator: function(validator, field, fieldValue) {
        debugger
        if(typeof validator !== 'string') {
            errMsg = 'Invalid date format string.';
            error = this.createValidatorError(errMsg);
            throw error
        }
        if(!moment(fieldValue, validator.toUpperCase(), true).isValid()) {
            errMsg = 'Given value "'+ fieldValue + '" for field "' + field + '" does not match the expecterd date format.';
            validationMsg = this.stringValidationMessage['format'];
            error = this.createValidationError(errMsg, validationMsg, validator);
            throw error;
        }
    }
});