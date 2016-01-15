// Ionic Starter App

/** Sample Code To test SQL Lite Integration **/

 var db = null;

// var example = angular.module('starter', ['ionic', 'ngCordova'])
//     .run(function($ionicPlatform, $cordovaSQLite) {
//         $ionicPlatform.ready(function() {
//             if(window.cordova && window.cordova.plugins.Keyboard) {
//                 cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//             }
//             if(window.StatusBar) {
//                 StatusBar.styleDefault();
//             }
//             db = $cordovaSQLite.openDB("my.db");
//             $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
//         });
//     });
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic','starter.controllers','starter.services','ngCordova','jett.ionic.filter.bar'])
.run(function($ionicPlatform,$cordovaSQLite) {

  $ionicPlatform.ready(function() {

    ionic.Platform.fullScreen(true, true);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
 
   /*window.plugins.sqlDB.copy("csiapp.db", function() {
            db = $cordovaSQLite.openDB("csiapp.db");
        }, function(error) {
            console.error("There was an error copying the database: " + error);
            db = $cordovaSQLite.openDB("csiapp.db");
        });
*/
   // db = $cordovaSQLite.openDB({name:"../db/csiapp.db"});
//     db = window.sqlitePlugin.openDatabase({name: "../db/csiapp.db", location: 1});
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
  // $cordovaSQLite.execute(db, "select * from helpinfo");

  });


  $ionicPlatform.registerBackButtonAction(function () {
  if ($ionicHistory.currentStateName === 'someStateName'){
    event.preventDefault();
  } else {
    $ionicHistory.goBack();
  }

  }, 100);

})
.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  }) 
  .state('app.otp', {
    url: '/otp',
    views: {
      'menuContent': {
        templateUrl: 'templates/otp.html',
        
      }
    }
  })
  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',      
      }
    }
  })
  .state('app.timeline', {
    url: '/timeline',
    views: {
      'menuContent': {
        templateUrl: 'templates/timeline.html',      
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller:'AppCtrl'
      }
    }
  })
  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'templates/contacts.html',
        controller:'ContactsCtrl'
      }
    }
  })
  .state('app.aroundyou', {
    url: '/aroundyou',
    views: {
      'menuContent': {
        templateUrl: 'templates/aroundyou.html',
        controller:'MapCtrl'
      }
    }
  }) 
 .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html',
        controller:'HelpCtrl'
      }
    }
  }) 

   .state('app.session', {
    url: '/session',
    views: {
      'menuContent': {
        templateUrl: 'templates/session.html',
        controller:'ContactsCtrl'
      }
    }
  })
  .state('tab', {
    abstract: true,
    templateUrl: function() {
        if (ionic.Platform.isAndroid()) {
            return  "templates/tabs-android.html";
        }
        return "templates/tabs-ios.html";
    }
})
  .state('app.message', {
    url: '/message',
    views: {
      'menuContent': {
        templateUrl: 'templates/message.html',
        controller:'ChatCtrl'
      }
    }
  })
  
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/employee-list.html',
                controller: 'EmployeeListCtrl'
      }
    }
  })

.state('app.employee', {
    url: '/employees/:employeeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/employee-detail.html',
                controller: 'EmployeeDetailCtrl'
      }
    }
  })
.state('app.reports', {
    url: '/employees/:employeeId/reports',
    views: {
      'menuContent': {
        templateUrl: 'templates/employee-reports.html',
                controller: 'EmployeeReportsCtrl'
      }
    }
  })
 

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
}

// .config(['$PubNub', function($ionicAppProvider) {
//   // Identify app
//   $ionicAppProvider.identify({
//     // The App ID (from apps.ionic.io) for the server
//     app_id: 'YOUR_APP_ID',
//     // The public API key all services will use for this app
//     api_key: 'YOUR_PUBLIC_KEY',
//     // Set the app to use development pushes
//     dev_push: true
//   });
// }])

);
