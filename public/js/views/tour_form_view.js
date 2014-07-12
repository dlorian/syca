EmberApp.TourFormView = Ember.View.extend({
    templateName: 'views/tour_form_view',
    attributeBindings: ['model'],
    model: null,

    // Validation error css properties
    errorClass: 'has-error has-feedback',
    errorFeedbackEl: '<span class="glyphicon glyphicon-remove form-control-feedback"></span>',

    // Validation success css properties
    successClass: 'has-success has-feedback',
    successFeedbackEl: '<span class="glyphicon glyphicon-ok form-control-feedback"></span>',

    // Added to the form-group in case of an invalid date. Used for displaying an error message.
    validationMsgEl: '<span id="validationMsg" class="help-block"></span>',

    // Cache for used jQuery objects
    $formContainer: null,
    $formFields: [],

    /**
     * Listener for didInsertElement-Event
     */
    didInsertElement: function() {
        var me = this;

        // Cache elements
        this.$formContainer = $('#formContainer');
        this.$formFields = this.$formContainer.find('input.validate');

        // Add event listener for change evet to valdiate an input
        this.$formFields.each(function(index, field) {
            // Validate field on value change
            $(field).change(function(event) {
                me.validateField(event.target);
            });
        });
    },

    actions: {
        submit: function() {
            var controller = this.get('controller');
            var formIsValid = this.validateForm();

            if(formIsValid && controller.save) {
                // only do save is form is valid
                controller.save();
            }
        }
    },

    /**
     * Validates all fields of the form.
     * @return {Boolean} Returns true, if the input of all fields is vaild.
     *                   Returns false, if the input of one field is invalid.
     */
    validateForm: function() {
        var me = this;
        var isValid = true;
        this.$formFields.each(function(index, field){
            if(!me.validateField(field)) {
                // if one field is invalid, the whole form is invalid
                isValid = false;
            }
        });
        return true;
    },

    /**
     * Validates the input of the given form field.
     * @param  {String} field jQuery-Selector of the form field.
     * @return {Boolean} returns true if the input of the field is valid, else false.
     */
    validateField: function(field) {
        // Get needed properties of the field.
        var me = this, name = $(field).attr('name'),
            error = EmberApp.Validator.validateField(name, this.get('model'));

        var isValid = (error) ? false : true;
        // Mark fields of form as valid or invalid.
        if(isValid) {
            this.markFieldAsValid(field);
        }
        else {
            $.each(error, function(index, err) {
                me.markFieldAsInvalid(field, err.validationMsg);
            });
        }

        return isValid;
    },

    /**
     * Marks the input of the field as valid.
     * @param  {String} field jQuery-Selector of the form field.
     */
    markFieldAsValid: function(field) {
        var parentDiv = $(field).parents('div.form-group');

        // Remove possible error indications
        parentDiv.removeClass(this.errorClass);
        parentDiv.find('.form-control-feedback').remove();
        this.hideHelpForField(field);

        // Add error indications to the element
        parentDiv.addClass(this.successClass);
        $(this.successFeedbackEl).insertAfter(field);
    },

    /**
     * Marks the input of the form field as invalid.
     * @param  {String} field jQuery-Selector of the form field.
     * @param  {String} validationMsg Information message to display for input correction.
     */
    markFieldAsInvalid: function(field, validationMsg) {
        var parentDiv = $(field).parents('div.form-group');

        // Remove possible success indications
        parentDiv.removeClass(this.successClass);
        parentDiv.find('.form-control-feedback').remove();

        // Add success indications to the element
        parentDiv.addClass(this.errorClass);
        $(this.errorFeedbackEl).insertAfter(field);
        this.showHelpForField(field, validationMsg);
    },

    /**
     * Shows the information help box for the given form field
     * @param  {String} field jQuery-Selector of the form field
     * @param  {String} validationMsg Displayes message of the help box.
     */
    showHelpForField: function(field, validationMsg) {
        if(validationMsg) {
            var helpBlock = $(field).siblings('.help-block');
            // If block already exists, show message only
            if(helpBlock.length) {
                helpBlock.html(validationMsg);
            }
            else {
               $(this.validationMsgEl).insertAfter(field).html(validationMsg);
            }
        }
    },

    /**
     * Hides the information help box for the given form field
     * @param  {String} jQuery-Selector of the form field
     */
    hideHelpForField: function(field) {
        $(field).siblings('.help-block').remove();
    }
});