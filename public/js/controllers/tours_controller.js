EmberApp.ToursController = Ember.ArrayController.extend({

	offset: 0,
	limit: 10,

    isLoading: false,

    errorMessage: null,

    init: function() {
        this._super();

        var queryParams = {
            limit: this.limit,
            offset: this.offset
        };
        this.doLoad(queryParams);
    },

    doLoad: function(queryParams) {
        var me = this;
        me.toggleProperty('isLoading');
        var promise = this.get('store').find('tour', queryParams);

        promise.then(function(tours) {
            // success
            me.set('content', tours);
            me.toggleProperty('isLoading');

        }, function() {
            // failure
            me.set('errorMessage', 'Beim Laden der Touren ist ein Fehler aufgetreten.');
            me.toggleProperty('isLoading');
        });
    },

    actions: {
        refresh: function() {
            // try to refrehs, simply load again
            var queryParams = {
                limit: this.limit,
                offset: this.offset
            };

            this.doLoad(queryParams);
        },

        clear: function() {

            // clear filter input
            this.setProperties({
                'dateFrom': null,
                'dateTo': null,
                'filterValue': null
            });

            var queryParams = {
                limit: this.limit,
                offset: this.offset
            };

            this.doLoad(queryParams);
        },

        filter: function() {
            var me = this;
                filter = this.getProperties('dateFrom', 'dateTo', 'filterValue');

            var queryParams = {
                limit: this.limit,
                offset: this.offset,
                from: filter.dateFrom,
                to: filter.dateTo,
                value: filter.filterValue
            };

            this.doLoad(queryParams);
        },

        fetch: function() {
            debugger
        }
    }
});