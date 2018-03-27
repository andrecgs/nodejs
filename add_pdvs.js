//adiciona um novo pdv se o mesmo for valido
function append_new_pdv( filename , instance, schema, res)
{
	var Validator = require('jsonschema').Validator;
	var v = new Validator();

	//realizando teste necessarios para validar insercao de novo pdvs
	var result_validate = v.validate(instance, schema); //verificando se jsonschema eh validation
	var qtd_err = result_validate.errors.length;
	var result_unique_id = get_pdvs_by_key( filename, "id", instance.id ) //verificando se id eh unica

	//se jsonschema ok e id eh unica entao tenta adicionar novo pdvs no arquivo pdvs.jsonschema
	var result_append = 1;
	if( qtd_err == 0 && result_unique_id == null ) result_append = append_json(filename, instance);

	//retorno da API para o resultado da operacao de insercao de novo pdv
	if( qtd_err != 0 ) { //jsonschema invalido
		//bad post request
		res.status(401).send({status: "error - invalid schema"});
		console.log(" # Erro durante validacao jsonschema");
		console.log(result_validate); //mostra resultada da validacao

	} else if( result_unique_id != null ) { //id nao unica
		//bad post request
		res.status(401).send({status: "error - allready exist"});
		console.log(" # Erro durante validacao id nao unica");

	} else if( result_append ) { //erro durante processo de escrita no arquivo
		//bad post request
		res.status(401).send({status: "error - during append json"});
		console.log(" # Erro escrita do arquivo pdvs.json"); //mostra resultada da validacao

	} else { //operacao de insercao ocorreu com sucesso !
			console.log(" # New data add sucessfully to pdvs.json"); //mostra resultada da validacao
			res.send({status: "new pvd add ok"});
	}
	
}
