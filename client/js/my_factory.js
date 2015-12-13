myAppointment.factory('myAppointmentFactory', function($http){
	var factory = {};
	var users = [];
	factory.user = {};
	var appointments = [];
	var errors = [];
	var date = Date.now();
	var angularErrors = [];



	factory.getUsers = function(callback){
		$http.get('/users').success(function(output){
			users = output;
			callback(users);
		})
	}

	factory.getUser = function(info, callback){
		$http.post('/user', info).success(function(output){
			factory.user = output;
			callback(factory.user);
		})
	}
	
	factory.getUserDetails = function(callback){
		callback(factory.user);
	}

	factory.addUser = function(info, callback){
		$http.post('/newUser', info).success(function(output){
			users.push({
				name: info.name,
				created_at: Date.now()
			});
			factory.user = output;
			callback(factory.user);
		})
	}
	factory.isUserNew = function(newUserName){
		console.log(users);
		for (var i = 0; i < users.length; i++) {
			console.log('for loop')
			if(users[i].name == newUserName){
				console.log('inside if')
				return false;
			}
		}
		return true;
	}

// get appointments
	factory.getAppointments = function(callback){
		$http.get('/appointments').success(function(output){
			appointments = output;
			callback(appointments);
		})
	}
//check appointments
// X 2. <= 3 appointments a day
// X 3. only add future dates 
// X 4. time only between 8-5
// X 5. user can only set one appointment per day
// 7. need to search complaints

	factory.appointmentValidation = function(info, name, callback){
		debugger;
		info.name = name;
		angularErrors = [];
		var sum = 0;
		//complaint validation
		if (info.complaint == null){
			angularErrors.push('Complaint is required')
		}
		else{
			if(info.complaint.length < 10){
				angularErrors.push('Complaint must be at least 10 characters')
			}
		}
		//date validation
		if (info.date == null){
			angularErrors.push('Date is required')
		}
		else
		{
			if (info.date <= date) {
				angularErrors.push('Date must be in future');
			}
		}
		
		//time validation
		if(info.time == null){
			angularErrors.push('Time is required')
		}
		else
		{
			var new_time = String(info.time);
			console.log(new_time);
			var formatTime = new_time.substr(16, 17);
			console.log(formatTime);
			if(formatTime < '08' || formatTime > '17'){
				angularErrors.push("Time must between 8am and 5pm");
			}
		}
		
		if(info.date != null){
			var new_date = info.date;
			var iso_date = new_date.toISOString();
			var formatDate = iso_date.substr(0, 10);
			for (var i = 0; i < appointments.length; i++) {
				if(appointments[i].date.substr(0, 10) == formatDate){
					sum = sum + 1;
				};
				if (sum > 3){
					angularErrors.push('Doctor can not see more than 3 patients a day')
					break;
				};
			};
			for (var i = 0; i < appointments.length; i++) {
				if(appointments[i].name === info.name && appointments[i].date.substr(0, 10) == formatDate){
					angularErrors.push('Patient can not have more than one appointment per day');
					break;
				}
			};
		}
		callback(angularErrors);
	}

//add appointments

	factory.addAppointment = function(info, callback){
		debugger;
		errors = [];
		$http.post('/newAppointment', info).success(function(output){
			debugger;
			if(output.errors){
				errors.push(output.errors);
				console.log(errors);
			}
			else
			{
				appointments.push({
					name: info.name,
					date: info.date,
					time: info.time,
					complaint: info.complaint
				});
			}
			callback(appointments);
		})
	}


	factory.getErrors = function(){
		return errors;
	}

	factory.getAngularErrors = function(){
		return angularErrors;
	}
//can only delete own appointments
	factory.removeAppointment = function(appointment){
		$http.post('/remove', appointment).success(function(output){
			for (var i = 0; i < appointments.length; i++) {
				if(appointments[i] == appointment){
					appointments.splice(i, 1);
				}
			};
		})
	}

	return factory;
})