angular.module('starter.services', ['ngResource'])

    .factory('Employees', function ($resource) {
        return $resource('http://192.168.1.223	:5000/employees/:employeeId/:data');
    });