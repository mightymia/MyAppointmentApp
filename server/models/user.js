var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	created_at: {type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);