EmberApp.BaseValidator = Ember.Object.extend({

    validationMessages: {
        presence: 'Eingabe erforderlich!'
    },

    /**
     * Creates a custom validation error.
     * @param errMsg: Usual error message used for console logging.
     * @param validationMessage: Special validation message used for displaying validation error in the UI. 
     * @return Retuns an error object with error type ValidationError
     */
    createValidationError: function(errMsg, validationMessage) {
        return {
            type: 'ValidationError',
            message: errMsg,
            validationMessage: validationMessage,
        }
    },

    /**
     * Validator function used for presence validation.
     * Verifies that fieldValue is set if the presence validator is true.
     */
    presenceValidator: function(validator, fieldValue) {
        if(validator === true) {
            if(!fieldValue || fieldValue === '') { 
                var errMsg = fieldValue + ' is not defined but required.';
                var err = this.createValidationError(errMsg, this.validationMessages['presence']);              
                throw err;
            }
        }
    }
});