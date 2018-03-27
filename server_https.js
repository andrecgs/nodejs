const fs = require('fs');// read/write json
const http = require('http');//server HTTP_PORT
const https = require('https');//server httpServer
const bodyParser = require("body-parser"); //POST
var turf = require('@turf/turf'); //GeoPoint


eval(fs.readFileSync('add_pdvs.js')+'');
eval(fs.readFileSync('append_json.js')+'');
eval(fs.readFileSync('findnear_pdvs.js')+'');
eval(fs.readFileSync('get_pdvs.js')+'');
eval(fs.readFileSync('var_schema_jsonschema.js')+'');


const HTTP_PORT = 9081;
const HTTPS_PORT = 9443;

//CERTIFICATES AND KEYS FOR HTTPS
//------------------------------------------------
const privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
const certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate};
//------------------------------------------------


//CONFIGURE EXPRESS
//------------------------------------------------
var express = require('express');
var app = express();

	//express configuration here
	//Here we are configuring express to use body-parser as middle-ware.
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
//------------------------------------------------


//INIT SERVER
//------------------------------------------------
var httpServer  = http.createServer(app);
var httpsServer = https.createServer(credentials,app);

//init/start http
httpServer.listen(HTTP_PORT , function() {
	console.log('server https on port %s.', HTTP_PORT);
});

//init/start https
httpsServer.listen(HTTPS_PORT , function() {
	console.log('server https on port %s.', HTTPS_PORT);
});
//------------------------------------------------


//ROUTES
//------------------------------------------------
//home - healthy check
app.get('/', function(req, res) {
	return res.send({status: "ok"});
});

// get pdvs by id
app.get('/pdvs/:id', function(req, res) {
	get_pdvs_by_key( 'pdvs.json', "id" , req.params.id , res );
});

//find neareast pdv
app.get('/findnear', function (req, res) {
	findnear_pdvs(req,res, 'pdvs.json');
});

//post -> add valid pdv to json
app.post('/', function (req, res) {
	append_new_pdv( 'pdvs.json' , req.body, schema, res);//var schema => localizada em var_schema_jsonschema.js
});

//page not found !
app.use(function(req, res, next) {
	res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");

});

//------------------------------------------------
//------------------------------------------------
//EO
