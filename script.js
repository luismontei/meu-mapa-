function pegarLocal() {
     return document.getElementById("lugar").value;
}

function link(){

	var local = pegarLocal();
	var url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + local +".json?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA";

	return url;
}


function consulta(){
	var consulta = new XMLHttpRequest();
	var url = link();
	consulta.open('GET', url, true); 


consulta.onreadystatechange = function(e) {
    if (this.readyState == 4){
        info = JSON.parse(this.response);
        natela();

    }
}


	consulta.send();

}

function natela(){

	document.getElementById('msg').innerHTML = "Resultados da busca";

	var cont;
	for(cont=0; cont<5; cont++){
		//mostrar os locais
		var local = "Local: " + info.features[cont].place_name;
		var coordinates = "<br> Coordenadas: Latitude =" + info.features[cont].geometry.coordinates[1] +" Longitude =" + info.features[cont].geometry.coordinates[0];
		document.getElementById('cont').innerHTML = local;
	}
}

function main(){
	consulta();
}
