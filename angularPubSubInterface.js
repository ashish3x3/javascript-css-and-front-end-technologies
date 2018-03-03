var app = angular.module("myApp", []);

app.controller("HelloController", function($scope) {
    $scope.helloTo = {};
    $scope.helloTo.title = "AngularJS";
    //ftech all the components available on home page 
    //iterate through the fieldset component and call submit for each object API
});


//define the request notification channel for the pub/sub service
app.factory('requestNotificationChannel', ['$rootScope', function ($rootScope) {
    // private notification messages
    var _SUBMIT_DATA_ = '_SUBMIT_DATA_';
    
    // publish edit data notification
    var submitData = function () {
        //window.alert('called pub sub broadcast');
        console.log('called pub sub broadcast');
        $rootScope.$broadcast(_SUBMIT_DATA_);
    };
    //subscribe to submit data notification
    var onSubmitData = function($scope, handler) {
        //window.alert('onSubmitData in pubsub');
        console.log('onSubmitData in pubsub');
        $scope.$on(_SUBMIT_DATA_, function(event, args) {
            
            handler();
        });
    };
   
    // return the publicly accessible methods
    return {
        submitData: submitData,
        onSubmitData: onSubmitData
    };
    }]);

    // define the data service that manages the data
    app.factory('dataService', ['requestNotificationChannel', function (requestNotificationChannel) {
        
        // sends notification that data has been updated
        var submitEvent = function(item) {
            requestNotificationChannel.submitData(item);
        };
       
        // return the publicly accessible methods
        return {
            submitEvent: submitEvent
            
        }
    }]);
