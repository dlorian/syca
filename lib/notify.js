
var notify = require('osx-notifier');

var notificationTitle = "SYCA";

var pass = function(subtitle, msg) {
    notify({
        type: 'pass',
        title: notificationTitle,
        subtitle: subtitle,
        message: msg,
        group: 'pass'
    });
};


var error = function(subtitle, msg) {
    notify({
        type: 'fail',
        title: notificationTitle,
        subtitle: subtitle,
        message: msg,
        group: 'error',
    });
};

var info = function(subtitle, msg) {
    notify({
        type: 'info',
        title: notificationTitle,
        subtitle: subtitle,
        message: msg,
        group: 'info'
    });
};

exports.notifier = function() {
    return {
        notifyInfo: info,
        notifyError: error,
        notifyPass: pass
    };
};