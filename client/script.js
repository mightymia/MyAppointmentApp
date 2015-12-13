var myAppointment = angular.module('myAppointment', ['ngRoute']);

	myAppointment.config(function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		})
		.when('/dashboard', {
			templateUrl: 'partials/dashboard.html'
		})
		.when('/newAppointment', {
			templateUrl: 'partials/new_appointment.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	})

