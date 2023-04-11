var mapArray;

readFromFile();

var mymap = L.map('Map').setView([0, 0], 13);

if(!navigator.geolocation){
    console.log('Il browser non supporta la geolocalizzazione.')
} else {
    navigator.geolocation.getCurrentPosition(getPosition)
}

var marker,circle; 

function getPosition(position){
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    var accuracy = position.coords.accuracy

    if(mymap.hasLayer(marker)) {
        mymap.removeLayer(marker)
    }

    if(mymap.hasLayer(circle)) {
        mymap.removeLayer(circle)
    }

    marker = L.marker([latitude,longitude])
    circle = L.circle([latitude,longitude],{radius: 15})

    var featureGroup = L.featureGroup([marker,circle]).addTo(mymap)

    // mymap.fitBounds(featureGroup.getBounds())

    console.log(lat+'|'+long+'|'+accuracy)

}

/*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data&amp;Imagery &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    
}).addTo(mymap);*/

/*L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);*/

function readFromFile() {
    d3.tsv("https://www.informagiovanifaenza.it/applichiamoci_map_points/mappa.tsv", function(d) {
        mapArray = d;
        //mostraTipologia('');
    });
}

function mostraTipologia(tipologia) {
	if (!mapArray) {
        return;
    }
	
    // gestire la geolocalizzazione
	mymap.remove();
    mymap = null;
    mymap = L.map('Map').setView([44.285268464566485, 11.882925129689992], 13);
	
	navigator.geolocation.getCurrentPosition(getPosition);
	
    var cluster = L.markerClusterGroup();
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data&amp;Imagery &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    
}).addTo(mymap);

   /* L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);*/
    var toAddToList = [];
    i = 0;
    j = 0; // conta il numero di elementi della tipologia. Inizialmente è a 0.
	//alert(mapArray.length);
    while (i < mapArray.length) {
        if (mapArray[i].CODICE.includes(tipologia)) {
            var lat = mapArray[i].LATITUDINE;
            var lon = mapArray[i].LONGITUDINE;
            var luogo = mapArray[i].LUOGO;
            if (tipologia === '') {
                var codice = mapArray[i].CODICE;
            } else {
                var codice = tipologia;
            }
            try {
                j++;
				/*if (mapArray[i].LUOGO == 'Rione Borgo Durbecco')
					alert(mapArray[i].LUOGO);*/
                var marker = createMarker(mapArray[i],lat, lon, luogo, j, codice);
                cluster.addLayer(marker);
            } catch (e) {
                console.error(e.message);
            }

        }
        i++;
    }
    mymap.addLayer(cluster);
    
}

function createMarker(info, lat, lon, luogo, numero, tipologia) {
    tipologia = tipologia.charAt(0);
    switch (tipologia) {
        case 'B':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaFarBaracca.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'C':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaStoricoCulturale.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'S':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaSport.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'G':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaGreen.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;
        case 'U':
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaUtilità.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            break;


        default:
            var ColorIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/informagiovanifaenza/mappaemotiva/main/img/mappa_immagini/IconaFarBaracca.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [27, 38],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
    }
		
	var marker = L.marker([lat, lon], { icon: ColorIcon }).bindPopup("<b>" + /*numero + ":  +*/ luogo + "</b>");
    marker.on('popupopen', function(){
        var img = img2 = "";
        if (!(typeof info.FOTO === "undefined")) {
            img = info.FOTO;
        }
		if (!(typeof info.FOTO2 === "undefined")) {
            img2 = info.FOTO2;
        }
        dettagli_marker(info.LUOGO, info.TIPOLOGIA, info.EMOZIONI, info.INDIRIZZO, info.LONGITUDINE, info.LATITUDINE, info.DESCRIZIONE, info.CURIOSITA, info.DEVIPROVARE, info.LINK, img, img2);
    });
	
    marker.on('popupclose', function(){
        document.getElementById("dettagli").style.display = "none";
    });
    return marker;
    
}

function dettagli_marker(luogo,tipologia,emozioni,indirizzo,longitudine,latitudine,descrizione,curiosita,daProvare,link,url_img, url_img2){
    var coord = new URL("http://maps.google.com/")
    coord.searchParams.append("ie", "UTF8");
    coord.searchParams.append("q", latitudine+","+longitudine);
    coord.searchParams.append("ll", latitudine+","+longitudine+"&z=18");

    document.getElementById("luogo").textContent = luogo;
    document.getElementById("tipologia").textContent = tipologia;
    document.getElementById("emozioni").textContent = emozioni;
    document.getElementById("indirizzo").textContent = indirizzo;
    /*document.getElementById("latitudine").textContent = latitudine;
    document.getElementById("longitudine").textContent = longitudine;*/
    document.getElementById("posizione").href = coord;
    document.getElementById("posizione").textContent = longitudine+","+latitudine;
    document.getElementById("descrizione").textContent = descrizione;
    document.getElementById("curiosita").textContent = curiosita;
    document.getElementById("daProvare").textContent = daProvare;
	if (link === "") {
		document.getElementById("link").href = "URL:void(0)";
        document.getElementById("link").textContent = "n.d.";
		document.getElementById("url").style.display = "none";
    } else {
		document.getElementById("link").href = link;
		document.getElementById("link").textContent = link;
		document.getElementById("url").style.display = "block";
	}
    if (url_img === "") {
        document.getElementById("info1").style.display = "none";
    } else {
        document.getElementById("info1").style.display = "block";
        document.getElementById("img_info1").src = url_img;
    }
	if (url_img2 === "") {
        document.getElementById("info2").style.display = "none";
    } else {
        document.getElementById("info2").style.display = "block";
        document.getElementById("img_info2").src = url_img2;
    }

    document.getElementById("dettagli").style.display = "block";
	window.scrollTo(0, document.body.scrollHeight);
}

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  //inidirizzamento a cordinate di click
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    // console.log(o.querySelector("label").innerHTML) //cosi stampo la citta scelta
    
    

    var paese_scelto = o.querySelector("label").id

    if (paese_scelto == "reggio_"){

        mymap.setView([44.698993, 10.629686], 12)

    } else if (paese_scelto == "faenza_"){

        mymap.setView([44.285268464566485, 11.882925129689992], 13)

    } else if (paese_scelto == "valmarecchia_"){

        mymap.setView([44.04938, 12.47190], 10)

    } else if (paese_scelto == "fiscaglia_"){

        mymap.setView([44.780250, 11.943190], 12)

    }


    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
  
});