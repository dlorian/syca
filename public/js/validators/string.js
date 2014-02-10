EmberApp.StringValidator =  EmberApp.ValidatorBase.extend({

    stringValidationMessage: {
        'type': 'Der eingegeben Wert entspricht keinem String.',
        'pattern': 'Der eingebene Wert entspricht nicht dem vorgegebenen Muster ({0}).',
    },

    init: function() {
        this._super();
        var config = {
            'type': this.typeValidator,
            'pattern': this.patternValidator,
        };
        $.extend(this.validatorConfig, config);
    },

    typeValidator: function(validator, field, fieldValue) {
        if(fieldValue && typeof fieldValue !== 'string') {
            errMsg = 'Given value '+ fieldValue + ' for field "' + field + '" is no type of string as expected.';
            validationMsg = this.stringValidationMessage['type'];
            error = this.createValidationError(errMsg, validationMsg, validator);
            throw error;
        }
    },

    patternValidator: function(validator, field, fieldValue) {
        var error, errMsg, pattern = null, text = null;
        if(typeof validator === 'string') {
            pattern = validator;
        }
        else if(typeof validator === 'object') {
            pattern = validator.regexp;
            text = validator.text;
        }

        // The Regular Expression for pattern validation has to be defined as string.
        if(!pattern || typeof pattern !== 'string') {
            errMsg = 'Invalid pattern validator. No Regular Expression string for pattern comparison defined';
            error = this.createValidatorError(errMsg);
            throw error;
        }

        // Create a new Regular Expression for the given pattern string.
        var regexp = new RegExp(pattern, 'g');
        if(!regexp.test(fieldValue)) {
            errMsg = 'Given value "'+ fieldValue + '" for field "' + field + '" does not match validation pattern.';
            validationMsg = this.stringValidationMessage['pattern'];
            error = this.createValidationError(errMsg, validationMsg, text);
            throw error;
        }
    }
});