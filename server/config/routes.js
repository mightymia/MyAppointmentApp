var users = require('./../controllers/users.js');
var appointments = require('./../controllers/appointments.js');


module.exports = function(app){
//user routes
	app.post('/newUser', function(req, res){
		users.create(req, res);
	})

	app.get('/users', function(req, res){
		users.show_all(req, res);
	})

	app.post('/user', function(req, res){

			users.show(req, res);
	})

//appointment routes

//get appointments
	app.get('/appointments', function(req, res){
		appointments.show_all(req, res);
	})
//add appointment
	app.post('/newAppointment', function(req, res){
		console.log('post to /newAppointment');
		appointments.create(req, res);
	})

	app.post('/remove', function(req, res){
		appointments.remove(req, res);
	})

}