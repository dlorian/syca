EmberApp.DateValidator = EmberApp.ValidatorBase.extend({

    init: function() {
        this._super();
        // Initialize a hash used for validation
        var config = {
            'type': this.typeValidator,
        };
        $.extend(this.validatorConfig, config);
    },

    typeValidator: function(validator, field, fieldValue) {
        if(!fieldValue instanceof Date) {
            throw new Error('Given value '+ fieldValue +' is no type of Date as expected.');
        }
    }
});