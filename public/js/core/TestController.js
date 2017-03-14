var TestController = BaseClass.extend({
    initialize: function (service, $scope, $rootScope, socket) {
        var self = this;
        this.$rootScope = $rootScope;
        this.socket = socket;
        socket.on('message', function (data) {
            console.log(data);
        });
    },

},  ['Service',  '$scope', '$rootScope', 'socket']);
adminApp.controller('TestController', TestController);