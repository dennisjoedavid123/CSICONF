var db = null;

angular.module('starter.controllers', ['ionic','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
          
          window.plugins.sqlDB.copy("csiapp.db", function() {
            
            db = $cordovaSQLite.openDB("csiapp.db");

        }, function(error) {
            console.error("There was an error copying the database: " + error);
            db = $cordovaSQLite.openDB("csiapp.db");
        });
          
            //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");

        });
    })

.controller('AppCtrl', function($scope,$rootScope,$location,$ionicModal, $timeout,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:ng
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope

  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal   var request = r equire("request");

   
  $scope.login = function() {
    
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

   console.log('Doing login', $scope.loginData);

    var otpToken ;

    otpToken = Math.floor(Math.random() * 90000) + 10000;
    otpToken = otpToken.toString().substring(0, 4);

    console.log($scope.loginData.mobilenumber);
    console.log(otpToken);

    var url = "https://2factor.in/API/V1/1f677c2c-b3b1-11e5-9a14-00163ef91450/SMS/"+$scope.loginData.mobilenumber+"/"+otpToken;

   console.log(url);

$http.post(url)
    .success(function(data) {
        console.log("SUCCESS!");
    })
    .error(function(data) {
        console.log("ERROR"+data);
    });
  console.log('Ended>>>>>>>>>>>>>');
        

    // Request for OTP - Ends 
    $rootScope.otpToken  = otpToken;
  
    $location.path('/app/otp');  
  
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 100);
  };

// $http.post(url)
//     .success(function(data) {
//         console.log("SUCCESS!");
//     })
//     .error(function(data) {
//         console.log("ERROR"+data);
//     });


// Perform the OTP Authentication action when the user submits the login form
  $scope.otpAuth = function() {

   console.log('Doing OTP Authenticate', $scope.loginData);
          
   console.log('From Screen ',$scope.loginData.otpToken);
   console.log('From Memory ',$rootScope.otpToken);
  
   if($rootScope.otpToken == $scope.loginData.otpToken) {
          $rootScope.otpToken = '';
          $scope.loginData.otpToken ='';

          $location.path('/app/dashboard');
}
   else{
      $location.path('/app/dashboard'); // change it later
         //$rootScope.otpToken = '';
          $scope.loginData.ErrorMsg ='';
   }
    
  };

})
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('PracticeCtrl', function($scope, $stateParams) {
 $scope.practices = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },                  
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('MessageCtrl', function($scope, $stateParams) {
})

.controller("HelpCtrl", function($scope,$cordovaSQLite) {

    $scope.select = function() {
     
        var query = "SELECT day_title from csi_day";
        console.log("The Query is >>>"+query);
        
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
          //console.log("SELECTED -> " + res.rows.item(0).name + " " + res.rows.item(0).company);
              console.log("SELECTED -> " + res.rows.item(0).day_title );
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

     $scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO csi_day (day_title) VALUES (?)";
        $cordovaSQLite.execute(db, query, [day_title]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        })
    }
  
})
// .controller('MapCtrl', function($scope,$state, $cordovaGeolocation) {
//    var options = {timeout: 10000, enableHighAccuracy: true};
 
//   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    
//     var latLng = new google.maps.LatLng(13.060416, 80.249634);
 
//     var mapOptions = {
//       center: latLng,
//       zoom: 12,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     console.log(document.getElementById("map"));

//     $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  

//   }, function(error){
//     console.log("Could not get location");
//   });
//     })

.controller('MapCtrl',function($scope){
  
     // google.maps.event.addDomListener(window,"load",function(){
            
     //    var latLng = new google.maps.LatLng(13.060416, 80.249634);
        
     //    var mapOptions = {
     //      center: latLng,
     //      zoom: 12,
     //      mapTypeId: google.maps.MapTypeId.ROADMAP
     //     };
     
     //   var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
     //    $scope.map = map;
     // });

})


// .controller('SQLQueryController',function($scope,$cordovaSQLLite)){

//         $scope.insert = function(firstname, lastname) {
//         var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
//         $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
//             console.log("INSERT ID -> " + res.insertId);
//         }, function (err) {
//             console.error(err);
//         });
//     }

//       $scope.select = function(lastname) {
//         var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
//         $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
//             if(res.rows.length > 0) {
//                 console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
//             } else {
//                 console.log("No results found");
//             }
//         }, function (err) {
//             console.error(err);
//         });
//     }
 

// })


 .controller('EmployeeListCtrl', function ($scope, Employees) {
       console.log("Inside >>>>>>.......");
        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.employees = Employees.query();
        }

        $scope.search = function () {
            $scope.employees = Employees.query({name: $scope.searchKey});
        }

        $scope.employees = Employees.query();
    })

    .controller('EmployeeDetailCtrl', function($scope, $stateParams, Employees) {
        console.log('details >>>>');
        $scope.employee = Employees.get({employeeId: $stateParams.employeeId});
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, Employees) {
        console.log('reports');
        $scope.employee = Employees.get({employeeId: $stateParams.employeeId, data: 'reports'});
    })


.controller('ContactsCtrl', function($scope) {
  
  $scope.data = {
    showDelete: false
  };
  
  $scope.edit  = function(item) {
    alert('Call Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Email Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
    { id: 30 },
    { id: 31 },
    { id: 32 },
    { id: 33 },
    { id: 34 },
    { id: 35 },
    { id: 36 },
    { id: 37 },
    { id: 38 },
    { id: 39 },
    { id: 40 },
    { id: 41 },
    { id: 42 },
    { id: 43 },
    { id: 44 },
    { id: 45 },
    { id: 46 },
    { id: 47 },
    { id: 48 },
    { id: 49 },
    { id: 50 }
  ];
  
}
);
