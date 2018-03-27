function get_pdvs_by_key( filename, searchField, searchVal , res) {

	//console.log(' # Realizando get /pdvs/%d', req.params.id);

	//criando objeto json lido do arquivo
	var json = JSON.parse(fs.readFileSync(filename, 'utf8'));

	//erro abrindo JSON
	if( json.pdvs == null ){ res.status(404).send({error: "PDV not found"}); return null;}

	//procurando id
	var result = json.pdvs.filter(function(value){ return value.id==searchVal;})

	//retorno
	if( result != null ) { res.send(result); }
	else { res.status(404).send({error: "PDV not found"}); }
}
