var express = require('express');
var bodyParser = require('body-Parser');
var morgan = require('morgan');
var config = require('./config.js')

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(config.port, function(err){
	if (err) {
		console.log(err);		
	} else {
		console.log("Listening on port 3000")
	}

});