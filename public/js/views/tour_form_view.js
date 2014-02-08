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
    

    $formContainer: null,
    $formFields: [],

    init: function() {
        this._super();
    },

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
            })
        });
    },

    submit: function() {
        debugger
        var controller = this.get('controller');
        var model = this.get('model');
        var isValid = this.validate();

        if(isValid && controller.save) {
            // only do save is form is valid
            controller.save(); 
        }
    },

    /**
     * Valdiates the input of the given form field.
     */
    validateField: function(field) {
        // Get needed properties of the field.
        var name = $(field).attr('name');
        var error = EmberApp.Validator.validateField(name, this.get('model'));

        var isValid = (error) ? false : true;
        if(isValid) {
            this.markFieldAsValid(field);
        }
        else {
            this.markFieldAsInvalid(field);
        }

        
    },

    /**
     * Marks the input of the field as valid. 
     */
    markFieldAsValid: function(field) {
        var parentDiv = $(field).parents('div.form-group');
        
        // Remove possible error indications
        parentDiv.removeClass(this.errorClass);
        parentDiv.find('.form-control-feedback').remove();

        // Add error indications to the element
        parentDiv.addClass(this.successClass);    
        $(this.successFeedbackEl).insertAfter(field);
    },

    /**
     * Marks the input of the field as invalid. 
     */
    markFieldAsInvalid: function(field) {
        var parentDiv = $(field).parents('div.form-group');

        // Remove possible success indications
        parentDiv.removeClass(this.successClass);
        parentDiv.find('.form-control-feedback').remove();

        // Add success indications to the element
        parentDiv.addClass(this.errorClass);
        $(this.errorFeedbackEl).insertAfter(field);
    },

    /**
     * Shows the help text block.
     */
    showHelpForField: function(field) {
        $(this.helpBlock).insertAfter(field).html(this.helpText); // Does this work??!! Verify!   
    },

    /**
     * Shows the help text block.
     */
    hideHelpForField: function(field) {
        $(field).find('#dateHelp').remove(); // does this work!!?? I guess not
    }
});