function findnear_pdvs(req,res, filename) {

  console.log('User: '+[ req.query.lat,  req.query.lng]);

  var options = {units: 'kilometers'};//turf options
  var userPoint = turf.point([ req.query.lat,  req.query.lng]);//carrega point do userPoint

  //---------------------------
  //carrega points do add_pdvs
  //criando objeto json lido do arquivo
  var json = JSON.parse(fs.readFileSync(filename, 'utf8'));
  if( json.pdvs == null ){ res.status(404).send({error: "reading json file"}); return null;}
  //---------------------------

  //--------------------------
  //calcula distancia entre a posicao passada como parametros e o pdvs
  var dist_pdv_address = [];
  for( var i = 0 ;  i< json.pdvs.length ; i++) {
  	var dist = turf.distance(userPoint, turf.point(json.pdvs[i].address.coordinates) , options);
  	dist_pdv_address.push(dist);//armazena array de distancia
    //console.log('pdv['+i+']: '+json.pdvs[i].address.coordinates);
  }
  //--------------------------

  //main loop function
  //--------------------------
  //procurando pdv mais proximo e verificando se esta dentro de sua regiao de cobertura
  while( json.pdvs.length != 0)
  {
    //---------------------------
    //encontra posicao do pdv mais proximo
    var min_dist_pos = dist_pdv_address.indexOf(Math.min.apply(null, dist_pdv_address ));
    console.log(' pdvs: '+json.pdvs[min_dist_pos].address.coordinates);
    console.log(" index = " + min_dist_pos);
    //---------------------------

    //regiao de cobertura do pdv
    var searchWithin = turf.multiPolygon(json.pdvs[min_dist_pos].coverageArea.coordinates);

    //---------------------------
    //verifica posicao do user dentro da regiao do pdv
    var ptsWithin = turf.pointsWithinPolygon(userPoint, searchWithin);
    var is_inside = ptsWithin.features.length;
    //---------------------------

    //---------------------------
    // nao esta dentro da regiao do pdv
    // remove o pdvs mais proximo e inicia nova busca pelo proximo pdv
    if( is_inside == 0 ) {
      console.log("FORA!");
    	json.pdvs.splice(min_dist_pos, 1);//atualiza array JSON
    	dist_pdv_address.splice(min_dist_pos,1);//atualiza array de distancias
    }
    else{ //retorna pdv encontrado !!
      console.log("DENTRO!");
      res.send(json.pdvs[min_dist_pos]);
      return;
    }
    //---------------------------
}

//---------------------------
//se chegou aqui eh porque nao achou nada
res.send({error: "no pdv nearby"});
//---------------------------
}
