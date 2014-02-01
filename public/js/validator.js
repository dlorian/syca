EmberApp.CustomValidator = Ember.Object.extend({

	// mapping of validatior attributes and corresponding validator functions
	validatorMapping: {},

	init: function() {
		// set up the validator mapping
		var mapping = {
			presence: this.presenceValidator,
			pattern: this.patternValidator
		}
		this.set('validatorMapping', mapping);
	},

	isValid: function(model) {
		var data = model.get('data');
		var validation = model.get('validation');

		if(!validation) {
			throw new Error('Required validation mapping is not defiend. Unable to verify model state');
		}

		try {
			this.validate(data, validation);
		}
		catch(e) {
			// if an error occured while valdiating the model 
			// we have to refutn false for signaling that
			//  the model is not valid.
			return false;
		}
		// if no error occured the model is valid
		return true;
	},

	validate: function(data, validations) {
		var me = this;
		debugger
		$.each(data, function(attribute, index){
			validation = validations[attribute];
			// if no validation is set, treat attribute as optional
			if(validation) {
				$.each(validation, function(key, index) {
					me.validatorMapping[key](data[attribute]);
				});
			}
		});

	},

	presenceValidator: function() {
		// TODO implement validation
	},

	patternValidator: function() {
		// TODO implement validation
	}

});