var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports = (function(){
	return {
		show_all: function(req, res){
			Appointment.find({}, function(err, results){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(results);
				}
			})
		},
		create: function(req, res){
			console.log(req);
			var appointment = new Appointment(req.body);
			console.log(appointment);
			appointment.save(function(err){
				if(err)
				{
					console.log(err);
					res.json(err);
				}
				else
				{
					res.json(appointment);
				}
			})
		},
		show: function(req, res){
			Appointment.find(req.body, function(err, appointment){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(appointment);
				}
			})
		},
		remove: function(req, res){
			Appointment.findOne(req.body, function(err, appointment){
				if(err)
				{
					console.log(err);
				}
				else
				{
					Appointment.remove(req.body, function(err, appointment){
						if(err)
						{
							console.log(err)
						}
						else
						{
							res.json(appointment);
						}
					})
				}
			})
		}
	}
})();