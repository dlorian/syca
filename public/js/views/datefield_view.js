EmberApp.DateField = Ember.View.extend({
    // Layout for the view.
    layout: Ember.Handlebars.compile(
        '<input type="text" class="validate form-control" id="datepicker">'
    ),
    attributeBindings: ['date', 'disabled', 'name', 'placeholder', 'helpTextEnabled'],
    date: null,         // Stores the ISO-String for the raw date. Also used as the return value of the field.
    rawDate: null,      // Stores the raw JavaScript Date object
    disabled: false,    // Stores the state of the input field.
    name: null,
    placeholder: null,
    helpTextEnabled: true,

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
    validDateString: EmberApp.dateFormat || 'DD.MM.YYYY',

    /**
     * When the view was inserted in the DOM, initialization of the datepicker can be done
     */
    didInsertElement: function() {
        var me = this;
        // Cache the jQuery element
        this.$datepicker = this.$('#datepicker');

        // Setup of the datepicker
        this.$datepicker.datepicker({
            format: 'dd.mm.yyyy',
            weekStart: 1
        })
        .on('changeDate', function(event) {
            me.set('rawDate', event.date);
        })
        .on('change', function() {
            me.set('rawDate', me.$datepicker.val());
        });

        // Set input field disabled if necessary
        this.updateDisabled();
        this.updateName();
        this.updatPlaceholder();

        // Initialize the value of the datepicker
        var date = this.get('date');
        if(date) {
            // Save the inital date as the raw date value.
            // date will hold the corresponding ISO-String.
            this.set('rawDate', date);

            // Do not set an undefined date to the datepicker
            this.$datepicker.datepicker('setValue', date);
        }
    },

    updateDisabled: function() {
        this.$datepicker.attr('disabled', this.get('disabled'));
    }.observes('disabled'),

    updateName: function() {
        this.$datepicker.attr('name', this.get('name'));
    }.observes('name'),

    updatPlaceholder: function() {
        this.$datepicker.attr('placeholder', this.get('placeholder'));
    }.observes('placeholder'),

    /**
     * Updates the date property regarding the new raw date.
     */
    updateDate: function() {
        var rawDate = this.get('rawDate');

        // Verify that the given date is valid
        var isValid = this.isValidDate(rawDate);

        if(isValid) {
            var date = this.rawDate2Date(rawDate);
            // Save the ISO-String for server side
            this.set('date', date.toISOString());
        }

        // Mark the field as valid or invaid
        this.markAsInvalid(!isValid);
    }.observes('rawDate'),

    /**
     * Updates the rawDate property regarding the new date. If the date
     * is set from the outside we have to update the raw date value.
     */
    updateRawDate: function() {
        var date = this.get('date');

        if(date === null) {
            // If date was set to null, clear datepicker value
            this.$datepicker.val(null);
            return;
        }

        // Check if date is a new date
        var rawDate = this.date2RawDate(date);
        if(rawDate && this.get('rawDate').getTime() !== rawDate.getTime()) {
            this.set('rawDate', date);
        }
    }.observes('date'),

    /**
     * Converts the given date string into a JavaScript Date object.
     * It is necessary that the date is a valid date object or a date
     * string in the correct format.
     */
    rawDate2Date: function(rawDate) {
        if(rawDate === null || rawDate === '') {
            return '';
        }
        if(rawDate instanceof Date) {
            return rawDate;
        }
        else if(typeof rawDate === 'string') {
            return moment(rawDate, this.get('validDateString')).toDate();
        }
    },

    /**
     * Converts the given date string into a JavaScript Date object.
     * Returns a date object if date is a valid date string, else null.
     */
    date2RawDate: function(date) {
        try {
           return moment(date).toDate();
        }
        catch(err) {
            return null;
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
        if(date === null || date === '') {
            // treat null as valid value, to make it possible to clear
            isValid = true;
        }
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
        debugger
        if(this.get('helpTextEnabled')) {
            $(this.helpBlock).insertAfter('#datepicker').html(this.helpText);
        }
    },

    /**
     * Shows the help text block.
     */
    hideHelp: function() {
        $('#dateHelp').remove();
    }
});