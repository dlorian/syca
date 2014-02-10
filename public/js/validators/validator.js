var Validator = Ember.Object.extend({
	// mapping of validatior attributes and corresponding validator functions
	validatorConfig: {},

	errors: [],

	init: function() {
		// Initialize a hash used for validation
		var mapping = {
			'string': 	new EmberApp.StringValidator(),
			'number': 	new EmberApp.NumberValidator(),
			'date': 	new EmberApp.DateValidator(),
			'boolean': 	new EmberApp.BooleanValidator(),
			'custom': 	new EmberApp.CustomValidator()
		}
		this.set('validatorConfig', mapping);
	},
	
	isValid: function(model) {
		var validation = model.get('validation');

		if(!validation) {
			throw new Error('Required validation mapping is not defiend. Unable to verify model state');
		}
		try {
			this.validate(model.get('data'), validation);
		}
		catch(e) {
			console.log('Error while validation occured!');
			console.log(e);
			// if an error occured while valdiating the model 
			// we have to refutn false for signaling that
			//  the model is not valid.
			var classNames = view.get('classNames');
			view.rerender();
			return false;
		}
		// if no error occured the model is valid
		return true;
	},

	validateModel: function(model) {

	},

	validateField: function(field, model) {
		var me = this;
		var errors = [];
		var fieldValue = model.get(field);
		var validations = model.get('validation');

		// get the valiation for the current field
		var fieldValidation = validations[field];
		if(fieldValidation['type']) {
			try {
				var validatorObject = this.validatorConfig[fieldValidation['type']];
				if(!validatorObject) {
					throw new Error('Invalid validator type: ' + validationType);
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