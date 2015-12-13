var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
	name: {type: String, required: true},
	date: {type: Date, required:true},
	time: {type: Date, required: true},
	complaint: {type: String, required: true, minlength: 10},
	created_at: {type: Date, default: Date.now}
});

var Appointment = mongoose.model('Appointment', appointmentSchema);