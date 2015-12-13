var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		show_all: function(req, res){
			User.find({}, function(err, results){
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
			var user = new User(req.body);
			user.save(function(err){
				if(err)
				{
					console.log(err);
					res.json(err);
				}
				else
				{
					res.json(user);
				}
			})
		},
		show: function(req, res){
			User.find(req.body, function(err, user){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(user);
				}
			})
		},
	}
})();