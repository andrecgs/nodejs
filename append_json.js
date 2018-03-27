//adiciona novo objeto no arquivo json
//	append_json('pdvs.json',set_new_data() );
function append_json(filename, newdata) {

		//lendo JSON
		var old_json = JSON.parse(fs.readFileSync(filename, 'utf8'));

		//erro na leitura
		if( old_json.pdvs == null  ) return 1;

		//adicionando dado
		old_json.pdvs.push(newdata);

		//converte de volta para JSON
		var new_json = JSON.stringify(old_json,null,2);

		//escreve arquivo atualizado
		fs.writeFile(filename, new_json, 'utf8');

		return 0;
}
