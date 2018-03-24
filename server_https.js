var fs = require('fs');// Read Synchrously JSON
var http = require('http');
var https = require('https');
const HTTP_PORT = 8081
const HTTPS_PORT = 8443;


//------------------------------------------------
var privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
var certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate};
//------------------------------------------------


//------------------------------------------------
var express = require('express');
var app = express();

	//express configuration here

//------------------------------------------------


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
//home
app.get('/', function(req, res) {
	
	//console.log("home access");
	//var content = fs.readFileSync("pdvs.json");
	//console.log("Output Content : \n"+ content);
	//console.log("\n *EXIT* \n");

	res.header('Content-type', 'text/html');

	return res.end('<h1>Hello, Secure World!<h1>');
});


// route with parameters
// get pdvs by id
app.get('/pdvs/:id', function(req, res) {

	console.log('realizando get /pdvs/:id => id=' + req.params.id);

	//criando objeto json lido do arquivo
	var json = JSON.parse(fs.readFileSync('pdvs.json', 'utf8'));
	//var name = json.pdvs[1].ownerName;

	//chama funcao que realiza busca pela id 
	var result;
	if( json.pdvs != null )
		result = search_pdvs_by_id( "id" , req.params.id , json.pdvs );

	//-----------------------------------------------
	//append_json('myjsonfile.json', {id: 2, square:9} );
	append_json('pdvs.json',set_new_data() );
	//-----------------------------------------------
		
	if( result != null ) {	
		res.send(result);
	} else {
		res.send("nao encontrou nada");
	}	

});


//page not found !
app.use(function(req, res, next) {
	res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
//------------------------------------------------


//------------------------------------------------
//FUNCOES
//adiciona novo objeto no arquivo json
function append_json(filename, newdata ) { 

	// realizando append no arquivo json 
	fs.readFile(filename, 'utf8', function readFileCallback(err, data) {
		if (err) {	//se ocorreu erro mostra no console
			console.log(err);
		} else {
			obj = JSON.parse(data); //transforma data em um objeto
			obj.pdvs.push(newdata); //add some data
			json = JSON.stringify(obj,null,2); //convert it back to json
			fs.writeFile(filename, json, 'utf8'); // write it back 
		}
	});
}

//funcao que busca na lista o pdv pela id
function search_pdvs_by_id( searchField, searchVal, lista ) {
 
	//procurando elemento na lista
	for( var i = 0 ; i < lista.length ; i++ ) {
		if( lista[i][searchField] == searchVal ) {
			//result = json.pdvs[i] ;
			//break;
			return lista[i] ;
		}
	}

}

function set_new_data() {

	var newdata = {
		id: "444",
		tradingName: "demonio",
		ownerName: "bafomete",
		document: "666.666/0001-01",
		coverageArea: {
			type: "MultiPolygon",
			coordinates: [
					   [
						[
				                      [
							 -667.83039,
							 -6669.95782
						      ],
						      [
							 -667.83176,
							 -6669.98487
						      ],
						      [
							 -667.78627,
							 -6669.98825
						      ],
						      [
							 -667.78885,
							 -6669.95105
						      ],
						      [
							 -667.83039,
							 -6669.95782
						      ]
			 	                ]
					  ]
				      ]
          			},
		address: { type: "Point", coordinates: [ -6667.81702, -669.970223] }
	}

	return newdata;
}
//------------------------------------------------
//EOF

//old but gold
/*
	json.pdvs.push({
		"id": "666",
		"tradingName": "demonio",
		"ownerName": "bafomete",
		"document": "666.666/0001-01",
		"coverageArea": {
			"type": "MultiPolygon",
			"coordinates": [
					   [
						[
				                      [
							 -667.83039,
							 -6669.95782
						      ],
						      [
							 -667.83176,
							 -6669.98487
						      ],
						      [
							 -667.78627,
							 -6669.98825
						      ],
						      [
							 -667.78885,
							 -6669.95105
						      ],
						      [
							 -667.83039,
							 -6669.95782
						      ]
			 	                ]
					  ]
				      ]
          			},
		"address": { "type": "Point", "coordinates": [ -6667.81702, -669.970223] }
	});
*/
