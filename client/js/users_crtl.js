myAppointment.controller('usersController', function($location, myAppointmentFactory){
	var _this = this;
	myAppointmentFactory.getUsers(function(data){
		_this.users = data;
		// console.log('from userCrtl', _this.users);
	})

	myAppointmentFactory.getUserDetails(function(data){
		_this.user = data;
		console.log('from userCrtl', _this.user);
	})


	this.errors = myAppointmentFactory.getErrors();

	this.getUser = function(){
		if(myAppointmentFactory.isUserNew(this.newUser.name) === true)
		{
			myAppointmentFactory.addUser(this.newUser, function(user){
				myAppointmentFactory.getUser(user, function(data){
					_this.current_user = data;
					console.log('get new user in crtl', _this.current_user);
					$location.path('/dashboard');
				});
			});
		}
		else
		{
			myAppointmentFactory.getUser(this.newUser, function(data){
				_this.current_user = data;
				console.log('get old user in crtl', _this.current_user);
				$location.path('/dashboard'); 
			})
		}
	}


});