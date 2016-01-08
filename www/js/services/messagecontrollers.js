
// Set Up Your Angular Module & Controller(s)
//
angular.module('PubNubAngularApp', ["pubnub.angular.service"])
.controller('ChatCtrl', function($rootScope, $scope, $location, PubNub) {
  // make up a user id (you probably already have this)
  $scope.userId   = "User " + Math.round(Math.random() * 1000);
  // make up a channel name
  $scope.channel  = 'CSI Channel';
  // pre-populate any existing messages (just an AngularJS scope object)
  $scope.messages = ['Welcome to ' + $scope.channel];

  if (!$rootScope.initialized) {
    // Initialize the PubNub service
    PubNub.init({
      subscribe_key: 'sub-c-bab31442-b459-11e5-b67b-02ee2ddab7fe',
      publish_key: 'pub-c-8be4b858-9eeb-4983-a33c-60686dda352d',
      uuid:$scope.userId
    });
    $rootScope.initialized = true;
  }

  // Subscribe to the Channel
  PubNub.ngSubscribe({ channel: $scope.channel });

  // Create a publish() function in the scope
  $scope.publish = function() {
    PubNub.ngPublish({
      channel: $scope.channel,
      message: "[" + $scope.userId + "] " + $scope.newMessage
    });
    $scope.newMessage = '';
  };

  // Register for message events
  $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload) {
    $scope.$apply(function() {
      $scope.messages.unshift(payload.message);
    });
  });

  // Register for presence events (optional)
  $rootScope.$on(PubNub.ngPrsEv($scope.channel), function(ngEvent, payload) {
    $scope.$apply(function() {
      $scope.users = PubNub.ngListPresence($scope.channel);
    });
  });

  // Pre-Populate the user list (optional)
  PubNub.ngHereNow({
    channel: $scope.channel
  });
  
  // Populate message history (optional)
  PubNub.ngHistory({
    channel: $scope.channel,
    count: 500
  });
});
