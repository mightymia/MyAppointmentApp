myAppointment.controller('appointmentsController', function($location, myAppointmentFactory){
	var _this = this;
	myAppointmentFactory.getAppointments(function(data){
		_this.appointments = data;
	})

	this.addAppointment = function(name){
		if(_this.newAppointment)
		{
			myAppointmentFactory.appointmentValidation(this.newAppointment, name, function(angularErrors){
				debugger;
				if (angularErrors.length == 0){
					myAppointmentFactory.addAppointment(_this.newAppointment, function(appointments){
						debugger;
						_this.errors = myAppointmentFactory.getErrors();
						if(_this.errors.length == 0){
							_this.appointments = appointments;
							$location.path('/dashboard');
						}
						else
						{
							_this.newAppointment = {};
						}
					});
				}
				else
				{
					_this.newAppointment = {};
					_this.angularErrors = angularErrors;
				}
			});
		}
	}
		
	this.removeAppointment = function(appointment){
		myAppointmentFactory.removeAppointment(appointment);
		}


});