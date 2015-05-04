var User = require('../models/user');
var Story = require('../models/story')

var  config = require('../../config');

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user)
{
	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresInMinute: 14440
	});

	return token;
}

module.exports = function(app, express){

	var api = express.Router();

	api.post('/signup', function(req, res){
		var user = new User(
		{
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		console.log(req.body);
    	console.log(req.body.username);
    	var token = createToken(user);
		user.save(function(err){
			if (err) {
				res.send(err);
				return;
			}

			res.json({
				token:token,
				success: true,
				message: 'User has been created'
			});

		})
	});

	api.get('/users', function (req,res)
	{
		User.find({}, function(err, users)
		{
			if (err)
			{
				res.send(err);
				return;
			}

			res.json(users);
		})
	})

	api.post('/login', function(req,res){
		console.log("User " + req.body.username + " is loggin in");
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user)
		{
			if (err) throw err;

			if (!user){
				res.send({message: "User doesn't exist"})
			} else if(user)
			{

				var validPassword = user.comparePassword(req.body.password);
				console.log(validPassword);
				if (!validPassword)
				{
					res.send({message: "Invalid Password"})
				} else
				{
					//// token 
					var token = createToken(user);
					res.json({
						success: true,
						message: "Successfully login!",
						token: token
					});

				}
			} 
		});
	});

	api.use(function (req,res,next){
		console.log("New user logged in to the app");
		var token = req.body.toke || req.param['token'] || req.headers['x-access-token'];
		console.log('Token is ' + token);

		// check if token valid
		if (token) {
			jsonwebtoken.verify(token,secretKey, function (err,decoded){

				if (err)
				{
					res.status(403).send({success:false, message:'Failed to authenticate'});
				}	else
				{
					req.decoded=decoded;
					next();

				} 

			});
		} else
		{
					res.status(403).send({success:false, message:'No token provided'});

		}


	});

	api.route('/')

		.post(function(req,res){
			var story= new Story({
				creator : req.decoded.id,
				content : req.body.content
			});
			story.save(function (err){
				res.send(err);
				return;
			})

			res.json({message : 'New Story Created'});
		})
		.get(function(req,res){
			Story.find({creator : req.decoded.id}, function (err,stories)
			{
				if (err)
				{
					res.send(err);
					return;
				}
				res.json(stories);

			})
		})

	api.get('/me',function (req,res){
		res.json(req.decoded);
	});

	return api;
}