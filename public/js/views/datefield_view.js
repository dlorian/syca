EmberApp.DateField = Ember.View.extend({
    // Layout for the view.
    layout: Ember.Handlebars.compile('<input type="text" class="validate form-control" id="datepicker">'),
    attributeBindings: ['date', 'disabled', 'name'],
    date: null,         // Stores the date object, which was set either manually by the input field or the datepicker.
    value: null,        // Stores the string representation of the date object, which is stored in the date property.
    disabled: false,    // Stroes the state of the input field.
    name: null,

    // Used jQuery elements
    $datepicker: null,  // jQuery element of the datepicker.
    $parentDiv: null,   // jQuery element used to mark the input as invalid.

    // Text used for displaying error information if date is invalid.
    helpText: 'Kein gültiges Datum angeben. Das Datum muss im Format "DD.MM.JJJJ" angegeben werden.',

    // Added to the form-group in case of an invalid date. Used for displaying an error message.
    helpBlock: '<span id="dateHelp" class="help-block"></span>',

    // error class added to the form group in case of a validation error
    errorClass: 'has-error',

    // Date format used for valdiaton of value input
    validDateString: 'DD.MM.YYYY',

    /**
     * When the view was inserted in the DOM, initialization of the datepicker can be done
     */
    didInsertElement: function() {
        var me = this;
        // Cache the jQuery element
        this.$datepicker = this.$('#datepicker');

        // Setup of the datepicker
        this.$datepicker.datepicker({ format: 'dd.mm.yyyy', weekStart: 1 })
        .on('changeDate', function(event) {
            me.set('date', event.date);
        })
        .on('change', function() {
            me.set('value', me.$datepicker.val());
        });

        // Set input field disabled if necessary
        this.updateDisabled();
        this.updateName();

        // Initialize the value of the datepicker
        var date = this.get('date');
        if(date) {
            // Do not set an undefined date to the datepicker
            this.$datepicker.datepicker('setValue', date);
        }
    },

    updateDisabled: function() {
        var disabled = this.get('disabled');
        this.$datepicker.attr('disabled', disabled);
    }.observes('disabled'),

    updateName: function() {
        var name = this.get('name');
        this.$datepicker.attr('name', name);
    }.observes('name'),

    /**
     * Updates the value porperty if the date property has changed.
     * Creates a corresponding string represantion for the date
     * object.
     */
    updateValue: function() {
        var date = this.get('date');
        var value = this.get('value');

        var isValid = this.isValidDate(date);
        if(isValid && value !== this.getValueForDate(date)) {
            this.set('value', date);
        }
        // mark input field valid or invalid, regarding isValid
        this.markAsInvalid(!isValid);
    }.observes('date'),

    /**
     * Updates the date property if the value property has changed.
     * Creates a date object based on the string represantion of the
     * value attribute.
     */
    updateDate: function() {
        var value = this.get('value');
        var isValid = this.isValidDate(value);
        if(isValid) {
            var date = this.getDateForValue(value);
            this.set('date', date);
        }
        //this.markAsInvalid(!isValid);
    }.observes('value'),

    /**
     * Returns the expected string representation for the given date.
     */
    getValueForDate: function(date) {
        return moment(date).format(this.get('validDateString'));
    },

    /**
     * Returns a date object for the given string representation of the date.
     */
    getDateForValue: function(value) {
        if(value instanceof Date) {
            return value;
        }
        else if(typeof value === 'string') {
            return moment(value, this.get('validDateString')).toDate();
        }
    },

    /**
     * Checks if the given date is a valid date. Date can either be a string
     * representation of a date or a date object.
     * The validation is based on the 'validateString' property.
     *
     * Returns true if the date is valid, else vale
     */
    isValidDate: function(date) {
        var isValid = false;
        if(date instanceof Date && moment(date).isValid()) {
            isValid = true;
        }
        else if(typeof date === 'string' && moment(date, this.get('validDateString'), true).isValid()) {
            // use strict date parsing
            isValid = true;
        }
        return isValid;
    },

    /**
     * Marks the input field either as valid or invalid.
     * If param 'invalid' is true the input will be marked
     * as invalid, else as valid.
     */
    markAsInvalid: function(invalid) {
        this.$parentDiv = this.$parentDiv || $('#datepicker').parents('div.form-group');
        if(invalid) {
            this.$parentDiv.addClass(this.errorClass);
            this.showHelp();
        }
        else {
            this.$parentDiv.removeClass(this.errorClass);
            this.hideHelp();
        }
    },

    /**
     * Shows the help text block.
     */
    showHelp: function() {
        $(this.helpBlock).insertAfter('#datepicker').html(this.helpText);
    },

    /**
     * Shows the help text block.
     */
    hideHelp: function() {
        $('#dateHelp').remove();
    }
});