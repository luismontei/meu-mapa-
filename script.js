var result;

function getcidade(){
    var pegar = document.getElementById('cidade').value; //a variavel pegar serve para pegar as cidades 
    return pegar;
}

function elementos(){ //Criando div e ol para listar os nomes dos lugares 

document.getElementById('listaritens').innerHTML = " "; //limpando a div 'listaritens' para que não haja a criação de outras li e div 
    var div_elementos = document.createElement('div');
    div_elementos.setAttribute('id', 'div_elementos');
    var nova_ol = document.createElement('ol');
    nova_ol.setAttribute('id', 'nova_ol');
    document.getElementById('listaritens').appendChild(div_elementos);
    document.getElementById('div_elementos').appendChild(nova_ol);
    
}

function pegarlink () {
    
    //fazendo a readquirição 
    
    var pegarlink = new XMLHttpRequest();
    var link = "http://api.mapbox.com/geocoding/v5/mapbox.places/"+ getcidade() +".json?access_token=pk.eyJ1IjoibGF1cmluZWEiLCJhIjoiY2sxaHI2M3J2MWk3bjNncW93a2ZneTIyMSJ9.IsCqY34SiFRNoGtHLTnEtQ"
    pegarlink.open('GET', link, true); // o pegarlink.open vai servi para abrir a conexão da função pegarlink 
console.log(link);
    pegarlink.onreadystatechange = function(a) {
        if (this.readyState == 4) {
            result = JSON.parse(this.response);
           
            var i = 0;
            do {
               
               inserirItem(result.features[i].place_name, i, result.features[i].geometry.coordinates[1], result.features[i].geometry.coordinates[0]);
               i++;
                } while (i < 5);
             // o for vai ser utilizado para indicar o número de opcoẽs que vai haver no mapa 
                
              
        }
        
    }
    pegarlink.send();
    
}



function inserirItem(item, id, latitude, longetude){ //Inserindo a lista de nome dos locais
        
    var mostrar = 'mostrarMap('+latitude+','+longetude+')';
    var nova_li = document.createElement('li');
    nova_li.setAttribute('id', id);
    var novo_link = document.createElement('a');
    
    novo_link.setAttribute('onclick', mostrar);
    var texto = document.createTextNode(item);
    novo_link.appendChild(texto); // vai mostrar os links na tela do computador 
    nova_li.appendChild(novo_link); 
    document.getElementById('nova_ol').appendChild(nova_li);
    
}
            function mostrarMap(latitude, longetude){ //Gerando o mapa na div ,'mostrarMap'
              creatmap();

                         var meumap = L.map('mapid').setView([latitude, longetude], 15);
    
                         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
                         maxZoom: 20,
                         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                         id: 'mapbox.streets'
                                             }).addTo(meumap);
                                               L.marker([latitude, longetude]).addTo(meumap);
                         
                                               L.circle([latitude, longetude], 100, {
                                               color: 'red',
                                               fillColor: '#f03',
                                               fillOpacity: 1
                                               }).addTo(meumap).bindPopup("Este é o circulo! BIOS");

}

            function creatmap(){ //div criada para ser gerado o mapa
              document.getElementById('mostrarmapa').innerHTML = ""; //limpando a div, para que quando recarregar a pagina, não ocorra nenhum erro. 
                var mapa = document.createElement('div');
                mapa.setAttribute('id', "mapid");
                mapa.style.height = "500px"; // esse style vai indicar a altura do mapa na tela do computador 
                mapa.style.width = "1400px"; // e esse style vai mostrar a largura do mapa na tela do computador 
            document.getElementById('mostrarmapa').appendChild(mapa);
}



function menu(){
    elementos();
    pegarlink();
    

}


