var Validator = Ember.Object.extend({
	// mapping of validatior attributes and corresponding validator functions
	validatorConfig: {},

	errors: [],

	init: function() {
		// Initialize a hash used for validation
		var mapping = {
			'string':   new EmberApp.StringValidator(),
			'number':   new EmberApp.NumberValidator(),
			'date':     new EmberApp.DateValidator(),
			'boolean':  new EmberApp.BooleanValidator(),
			'custom':   new EmberApp.CustomValidator()
		};
		this.set('validatorConfig', mapping);
	},

	validateField: function(field, model) {
		var errors = [];
		var fieldValue = model.get(field);
		var validations = model.get('validation');

		// get the valiation for the current field
		var fieldValidation = validations[field];
		if(fieldValidation['type']) {
			try {
				var validatorObject = this.validatorConfig[fieldValidation['type']];
				if(!validatorObject) {
					throw new Error('Invalid validator type: ' + fieldValidation['type']);
				}
				validatorObject.validate(fieldValidation, field, fieldValue);
			}
			catch(err) {
				errors.push({
                    field: field,
                    value: fieldValue,
                    errType: err.type,
                    validationMsg: err.validationMessage
                });
				// Log errors to console for debugging purpose TODO: Add logging framework
                if(err.type === 'ValidationError' || err.type === 'ValidatorError') {
                    console.log(err.message);
                }
                else {
                    console.log('Error occurd while validation: ' + err.message);
                }
			}
		}

		if(errors.length > 0) {
			return errors;
		}
		return null;
	}
});
EmberApp.Validator = new Validator();