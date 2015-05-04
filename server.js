var express = require('express');
var bodyParser = require('body-Parser');
var morgan = require('morgan');
var config = require('./config.js');
var mongoose = require('mongoose');

var app = express();


mongoose.connect(config.database, function(err){

	if (err)
	{
		console.log(err);
	}else
	{
		console.log("Connected to database");
	}
});


app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var api = require('./app/routes/api')(app,express);
app.use('/api',api);



app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/app/views/index.html');

});

app.listen(config.port, function(err){
	if (err) {
		console.log(err);		
	} else {
		console.log("Listening on port 3000")
	}

});